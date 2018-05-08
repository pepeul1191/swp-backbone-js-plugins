var TableView = Backbone.View.extend({
	//el: "#formUbicaciones", definido en el constructor
	initialize: function(params){
    // inicializar variables
    this.idTable = params["idTable"];
		this.idTableBody = params["idTable"] + "Body";
    this.targetMensaje = params["targetMensaje"];
    this.mensajes = params["mensajes"];
    this.collection = params["collection"];
		this.urlListar = params["urlListar"];
    this.urlGuardar = params["urlGuardar"];
    this.fila = params["fila"];
		this.filaBotones = params["filaBotones"];
		this.model = params["model"];
    this.collection = params["collection"];
		this.observador = {
			nuevo: [],
			editado: [],
			eliminado: [],
		};
    // asignacion dinamica de eventos
    this.events = this.events || {};
    //this.events["keyup #" + this.idNombre] = "buscarCooincidencias";
		//this.events["focusout #" + this.idNombre] = "limpiarSiVacio";
		this.listenTo(this.collection, "change", this.onChange, this);
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
		"keyup input.text": "inputTextEscribir",
		"click i.quitar-fila": "quitarFila",
		"click button.agregar-fila": "agregarFila",
		"click button.guardar-tabla": "guardarTabla",
  },
  listar: function(){
    this.collection.reset();
    var viewInstance = this;
    $.ajax({
      type: "GET",
      url: viewInstance.urlListar,
      data: {csrfmiddlewaretoken: CSRF},
      async: false,
      success: function(data){
        var responseData = JSON.parse(data);
				var tbody = document.createElement("tbody");
        for(var i = 0; i < responseData.length; i++){
					var tr = document.createElement("tr");
          var modelo = new window[viewInstance.model](responseData[i]);
          for (var key in responseData[i]) {
            //console.log(key, responseData[i][key]);
            var fila = viewInstance.fila[key];
						var params = {
              key: key,
							modelo: modelo,
              tdProps: 'XD',
							fila: fila,
            };
						var td = viewInstance.helper()[fila.tipo](params);
						tr.appendChild(td);
          }
					// append de botones de la fila
					var params = {
						modelo: modelo,
						filaBotones: viewInstance.filaBotones,
						estilos: viewInstance.fila.filaBotones.estilos,
					};
					var tdBotones = viewInstance.helper()["btn_td"](params);
					tr.appendChild(tdBotones);
					// agregar modelo a collection
          viewInstance.collection.add(modelo);
					tbody.appendChild(tr);
        }
        //console.log(viewInstance.collection);console.log(tbody);
				document.getElementById(viewInstance.idTable).appendChild(tbody);
      },
      error: function(error){
        $("#" + viewInstance.targetMensaje).removeClass("color-success");
        $("#" + viewInstance.targetMensaje).removeClass("color-warning");
        $("#" + viewInstance.targetMensaje).addClass("color-rojo");
        $("#" + viewInstance.targetMensaje).html(viewInstance.mensajes["errorListarAjax"]);
        console.log(error);
      }
    });
  },
  helper: function(params){
    return {
      "td_id": function(params){
				//console.log("LABEL_ID");
        var td = document.createElement("td");
        td.setAttribute("style", params.fila.estilos);
				td.setAttribute("key", params.key);
        td.innerHTML = params.modelo.get(params.key);
        //console.log(td);
				return td;
      },
      "label": function(params){
        //console.log("LABEL");
      },
			"text": function(params){
				//console.log("LABEL_ID");
				var td = document.createElement("td");
        var inputText = document.createElement("INPUT");
				inputText.setAttribute("type", "text");
        inputText.setAttribute("style", params.fila.estilos);
				inputText.setAttribute("key", params.key);
        inputText.value = params.modelo.get(params.key);
				inputText.classList.add("text");
				td.appendChild(inputText);
        //console.log(inputText);
				return td;
      },
      "btn_td": function(params){
				//console.log("BTN-TD");
				var td = document.createElement("td");
				td.setAttribute("style", params.estilos);
				for(var i = 0; i < params.filaBotones.length; i++){
					var boton = null;
					switch(params.filaBotones[i].tipo) {
						case "i": // de font-awesome 4
							//<i class="fa fa-chevron-left" aria-hidden="true"></i>
							var htmlI = document.createElement("i");
							htmlI.classList.add("fa");
							htmlI.classList.add(params.filaBotones[i].clase);
							htmlI.setAttribute("style", params.filaBotones[i].estilos);
							// operación a la que se le asignará un evento
							htmlI.classList.add("quitar-fila");
							boton = htmlI;
							break;
						case "href":
							// TODO
							break;
						default:
							console.log("tipo de botón no soportado");
					}
					if(boton != null){
						//console.log(boton);
						td.appendChild(boton);
					}
				}
				//console.log(params.modelo);
				return td;
      },
    };
  },
	inputTextEscribir: function(event){
		var idFila = event.target.parentElement.parentElement.firstChild.innerHTML;
		var valorInput = event.target.value;
		var key = event.target.getAttribute("key");
		var modelo = this.collection.get(idFila);
		//console.log("inputTextEscribir");
		modelo.set(key, valorInput);
		//thisDOM.parent().parent().children(0).children(0).html();
	},
	quitarFila: function(event){
		var idFila = event.target.parentElement.parentElement.firstChild.innerHTML;
		var tbody = event.target.parentElement.parentElement.parentElement;
		var td = event.target.parentElement.parentElement;
		tbody.removeChild(td);
		var modelo = this.collection.get(idFila);
		//console.log(modelo);
		// si el modelo a editar ya existe como nuevo o editado, eliminar de observador y agregar como eliminado en observador
		if(_.contains(this.observador.nuevo, (idFila + ""))){
			this.observador.nuevo = _.without(this.observador.nuevo, (idFila + ""));
		}
		if(_.contains(this.observador.editado, (idFila + ""))){
			this.observador.editado = _.without(this.observador.editado, (idFila + ""));
		}
		if(!_.contains(this.observador.eliminado, (idFila + ""))){
			this.observador.eliminado.push(idFila + "");
		}
		this.collection.remove(modelo);
	},
	agregarFila: function(event){
		var tbody = event.target.parentElement.parentElement.parentElement.parentElement.lastChild;
		var modelo = new window[this.model]({id: this.idTable + _.random(0, 1000)});
		var tr = document.createElement("tr");
		for (var key in this.fila) {
			if(key != "filaBotones"){
				var fila = this.fila[key];
				var params = {
					key: key,
					modelo: modelo,
					tdProps: 'XD',
					fila: fila,
				};
				var td = this.helper()[fila.tipo](params);
				tr.appendChild(td);
			}else{
				var params = {
					modelo: modelo,
					filaBotones: this.filaBotones,
					estilos: this.fila.filaBotones.estilos,
				};
				var tdBotones = this.helper()["btn_td"](params);
				tr.appendChild(tdBotones);
			}
		}
		// agregar modelo a collection
		this.collection.add(modelo);
		//console.log(tr);console.log(tbody);
		tbody.appendChild(tr);
	},
	guardarTabla: function(event){
		var data = {
			nuevos: [],
			editados: [],
			eliminados: [],
		};
		for (var key in this.observador) {
			for (var i = 0; i < this.observador[key].length; i++) {
				var observadorId = this.observador[key][i];
				if(key == "nuevo" || key == "editado"){
					var modelo = this.collection.get(observadorId);
					data[key + "s"].push(modelo.toJSON());
				}else{
					data["eliminados"].push(observadorId);
				}
			}
		}
		var viewInstance = this;
		$.ajax({
			type: "POST",
			url: viewInstance.urlGuardar,
			data: {csrfmiddlewaretoken: CSRF, data: JSON.stringify(data)},
			async: false,
			success: function(data){
				var responseData = JSON.parse(data);
				console.log(responseData);
			},
			error: function(error){
				$("#" + viewInstance.targetMensaje).removeClass("color-success");
				$("#" + viewInstance.targetMensaje).removeClass("color-warning");
				$("#" + viewInstance.targetMensaje).addClass("color-rojo");
				$("#" + viewInstance.targetMensaje).html(viewInstance.mensajes["errorGuardarAjax"]);
				$("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
				console.log(error);
			}
		});
	},
	onChange: function(modeloCambiado) {
		if(modeloCambiado != null){
			var idFila = modeloCambiado.get("id") + "";
			if(idFila.indexOf(this.idTable) >= 0){
				if(!_.contains(this.observador.nuevo, idFila)){
					this.observador.nuevo.push(idFila);
				}
			}else{
				if(!_.contains(this.observador.editado, idFila)){
					this.observador.editado.push(idFila);
				}
			}
			//console.log(this.observador);
		}
  },
});
