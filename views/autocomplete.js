var AutocompleteView = Backbone.View.extend({
	el: '#formUbicaciones',
	initialize: function(params){
    // inicializar variables
    this.idTarget = params['id'];
    this.idNombre = params['nombre'];
    this.idLabelMensajeError = params['targetMensajeError'];
    this.targetSugerencias = params['targetSugerencias'];
    this.mensajeError = params['mensajeError'];
    this.collection = params['collection'];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events['keyup #' + this.idNombre] = 'buscarCooincidencias';
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click .sugerencia": "sugerenciaClick",
  },
  buscarCooincidencias: function(event) {
    var textoIngresado = $(event.target).val();
    this.collection.reset();
    var viewInstance = this;
    $.ajax({
      type: "GET",
      url: BASE_URL + "distrito/buscar",
      data: {nombre: textoIngresado, csrfmiddlewaretoken: CSRF},
      async: false,
      success: function(data){
        var distritos = JSON.parse(data);
        for(var i = 0; i < distritos.length; i++){
          var distrito = new Distrito({id: distritos[i]['id'], nombre: distritos[i]['nombre']});
          viewInstance.collection.add(distrito);
        }
        $("#" + viewInstance.idLabelMensajeError).html("");
        if(viewInstance.collection.length > 0){
          var lista = ""
          $("#" + viewInstance.targetSugerencias).empty();
          viewInstance.collection.each(function(distrito) {
            var temp = "<li><label class='oculto sugerencia'>" + distrito.get("id") + "</label><label>" + distrito.get("nombre") + "</label></li>";
            lista = lista + temp;
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
  sugerenciaClick: function(event){
    var target = event.target;
    console.log(target);
  },
});
