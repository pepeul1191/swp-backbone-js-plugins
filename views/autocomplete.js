var AutocompleteView = Backbone.View.extend({
	el: '#formUbicaciones',
	initialize: function(params){
    // inicializar variables
    this.idTarget = params['id'];
    this.idNombre = params['nombre'];
    this.modelo = params['modelo'];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events['keyup #' + this.idNombre] = 'buscarCooincidencias';
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
  },
  buscarCooincidencias: function(event) {
    var textoIngresado = $(event.target).val();
    this.modelo.buscarCooincidencias(textoIngresado);
  },
});
