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
		this.model = params["model"];
    this.collection = params["collection"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    //this.events["keyup #" + this.idNombre] = "buscarCooincidencias";
		//this.events["focusout #" + this.idNombre] = "limpiarSiVacio";
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
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
				var nodeTbody = document.createElement("tbody");
        for(var i = 0; i < responseData.length; i++){
					var nodeTr = document.createElement("tr");
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
						nodeTr.appendChild(td);
          }
          viewInstance.collection.add(modelo);
					nodeTbody.appendChild(nodeTr);
        }
        //console.log(viewInstance.collection);console.log(nodeTbody);
				document.getElementById(viewInstance.idTableBody).appendChild(nodeTbody);
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
      "label_id": function(params){
				//console.log("LABEL_ID");
        var nodeTd = document.createElement("td");
        nodeTd.setAttribute("style", params.fila.estilos);
        nodeTd.innerHTML = params.modelo.get(params.key);
        //console.log(nodeTd);
				return nodeTd;
      },
      "label": function(params){
        //console.log("LABEL");
      },
			"text": function(params){
				//console.log("LABEL_ID");
        var nodeTd = document.createElement("td");
        nodeTd.setAttribute("style", params.fila.estilos);
        nodeTd.innerHTML = params.modelo.get(params.key);
        //console.log(nodeTd);
				return nodeTd;
      },
      "btn-td": function(params){

      },
    };
  },
	verModelo: function(event){
		console.log(this.model.toString());
	},
});
