var AutocompleteView = Backbone.View.extend({
	el: "#formUbicaciones",
	initialize: function(params){
    // inicializar variables
    this.idTarget = params["id"];
    this.idNombre = params["nombre"];
    this.idLabelMensajeError = params["targetMensajeError"];
    this.targetSugerencias = params["targetSugerencias"];
    this.mensajeError = params["mensajeError"];
    this.collection = params["collection"];
		this.url = params["url"];
		this.model = params["model"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events["keyup #" + this.idNombre] = "buscarCooincidencias";
		this.events["focusout #" + this.idNombre] = "limpiarSiVacio";
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click .sugerencia": "sugerenciaClick",
		"click #verModelo": "verModelo",
  },
  buscarCooincidencias: function(event) {
    var textoIngresado = $(event.target).val();
    this.collection.reset();
    var viewInstance = this;
    $.ajax({
      type: "GET",
      url: viewInstance.url,
      data: {nombre: textoIngresado, csrfmiddlewaretoken: CSRF},
      async: false,
      success: function(data){
        var distritos = JSON.parse(data);
        for(var i = 0; i < distritos.length; i++){
          var distrito = new Distrito({id: distritos[i]["id"], nombre: distritos[i]["nombre"]});
          viewInstance.collection.add(distrito);
        }
        $("#" + viewInstance.idLabelMensajeError).html("");
        if(viewInstance.collection.length > 0){
          var lista = ""
          $("#" + viewInstance.targetSugerencias).empty();
          viewInstance.collection.each(function(distrito) {
						var node = document.createElement("li");
						node.classList.add("sugerencia");
						node.setAttribute("id", distrito.get("id"));
						var textnode = document.createTextNode(distrito.get("nombre"));
						node.appendChild(textnode);
						document.getElementById(viewInstance.targetSugerencias).appendChild(node);
          });
          $("#" + viewInstance.targetSugerencias).removeClass("oculto");
          $("#" + viewInstance.targetSugerencias).append(lista);
        }else{
          $("#" + viewInstance.idLabelMensajeError).removeClass("color-success");
          $("#" + viewInstance.idLabelMensajeError).removeClass("color-rojo");
          $("#" + viewInstance.idLabelMensajeError).addClass("color-warning");
          $("#" + viewInstance.idLabelMensajeError).html("No hay coincidencias");
        }
      },
      error: function(error){
        $("#" + viewInstance.idLabelMensajeError).removeClass("color-success");
        $("#" + viewInstance.idLabelMensajeError).removeClass("color-warning");
        $("#" + viewInstance.idLabelMensajeError).addClass("color-rojo");
        $("#" + viewInstance.idLabelMensajeError).html(viewInstance.mensajeError);
        console.log(error);
      }
    });
  },
	limpiarSiVacio: function(event){
		//var textoIngresado = $(event.target).val();
		// TODO
	},
  sugerenciaClick: function(event){
    $("#" + this.idTarget).html(event.target.getAttribute("id"));
		$("#" + this.idNombre).val(event.target.innerText);
		$("#" + this.targetSugerencias).empty();
		this.model = this.collection.get(event.target.getAttribute("id"));
		this.collection.reset();
  },
	verModelo: function(event){
		console.log(this.model.toString());
	},
});
