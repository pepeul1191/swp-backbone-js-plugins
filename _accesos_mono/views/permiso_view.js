var PermisoView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
    this.tablaPermiso =  new TableView(dataTablaPermiso);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    // tabla permisos
    "click #tablaPermiso > tfoot > tr > td > button.agregar-fila": "agregarFilaPermiso",
		"click #tablaPermiso > tfoot > tr > td > button.guardar-tabla": "guardarTablaPermiso",
		"keyup #tablaPermiso > tbody > tr > td > input.text": "inputTextEscribirPermiso",
    "click #tablaPermiso > tbody > tr > td > i.quitar-fila": "quitarFilaPermiso",
	},
	render: function() {
		this.$el.html(this.getTemplate());
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'bower_components/swp-backbone/_accesos_mono/permiso.html',
		   type: "GET",
		   async: false,
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	mostrarTabla: function(){
		this.tabla.listar();
	},
  //evnetos tabla de permisos
  inputTextEscribirPermiso: function(event){
    this.tablaPermiso.inputTextEscribir(event);
  },
  quitarFilaPermiso: function(event){
    this.tablaPermiso.quitarFila(event);
  },
  guardarTablaPermiso: function(event){
    this.tablaPermiso.guardarTabla(event);
  },
  agregarFilaPermiso: function(event){
    this.tablaPermiso.agregarFila(event);
  },
});
