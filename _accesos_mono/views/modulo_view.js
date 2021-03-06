var ModuloView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
    this.tablaModulo =  new TableView(dataTablaModulo);
    this.tablaSubtitulo = new TableView(dataTablaSubtitulo);
    this.tablaItem = new TableView(dataTablaItem);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    // tabla modulos
    "click #tablaModulo > tfoot > tr > td > button.agregar-fila": "agregarFilaModulo",
		"click #tablaModulo > tfoot > tr > td > button.guardar-tabla": "guardarTablaModulo",
		"keyup #tablaModulo > tbody > tr > td > input.text": "inputTextEscribirModulo",
    "click #tablaModulo > tbody > tr > td > i.quitar-fila": "quitarFilaModulo",
    "click #tablaModulo > tbody > tr > td > i.ver-subtitulos": "verSubtitulos",
    // tabla subtitulos
    "click #tablaSubtitulo > tfoot > tr > td > button.agregar-fila": "agregarFilaSubtitulo",
		"click #tablaSubtitulo > tfoot > tr > td > button.guardar-tabla": "guardarTablaSubtitulo",
		"keyup #tablaSubtitulo > tbody > tr > td > input.text": "inputTextEscribirSubtitulo",
    "click #tablaSubtitulo > tbody > tr > td > i.quitar-fila": "quitarFilaSubtitulo",
    "click #tablaSubtitulo > tbody > tr > td > i.ver-items": "verItems",
    // tabla items
    "click #tablaItem > tfoot > tr > td > button.agregar-fila": "agregarFilaItem",
		"click #tablaItem > tfoot > tr > td > button.guardar-tabla": "guardarTablaItem",
		"keyup #tablaItem > tbody > tr > td > input.text": "inputTextEscribirItem",
    "click #tablaItem > tbody > tr > td > i.quitar-fila": "quitarFilaItem",
	},
	render: function() {
		this.$el.html(this.getTemplate());
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'bower_components/swp-backbone/_accesos_mono/templates/modulo.html',
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
  //evnetos tabla de modulos
  inputTextEscribirModulo: function(event){
    this.tablaModulo.inputTextEscribir(event);
  },
  quitarFilaModulo: function(event){
    this.tablaModulo.quitarFila(event);
  },
  guardarTablaModulo: function(event){
    this.tablaModulo.guardarTabla(event);
  },
  agregarFilaModulo: function(event){
    this.tablaModulo.agregarFila(event);
  },
  verSubtitulos: function(event){
    var moduloId = event.target.parentElement.parentElement.firstChild.innerHTML;
    this.tablaSubtitulo.urlListar =
      limpiarURL(BASE_URL + "accesos/subtitulo/listar/" , moduloId);
    this.tablaSubtitulo.moduloId = moduloId;
    this.tablaSubtitulo.limpiarBody();
    this.tablaItem.limpiarBody();
    this.tablaSubtitulo.listar(moduloId);
    $("#formTableSubtitulo").removeClass("oculto");
    $("#formTableItem").addClass("oculto");
  },
  //eventos tabla de subtitulos
  inputTextEscribirSubtitulo: function(event){
    this.tablaSubtitulo.inputTextEscribir(event);
  },
  quitarFilaSubtitulo: function(event){
    this.tablaSubtitulo.quitarFila(event);
  },
  guardarTablaSubtitulo: function(event){
    this.tablaSubtitulo.extraData = {modulo_id: this.tablaSubtitulo.moduloId};
    this.tablaSubtitulo.guardarTabla(event);
  },
  agregarFilaSubtitulo: function(event){
    this.tablaSubtitulo.agregarFila(event);
  },
  verItems: function(event){
    var subtituloId = event.target.parentElement.parentElement.firstChild.innerHTML;
    this.tablaItem.urlListar =
      limpiarURL(BASE_URL + "accesos/item/listar/" , subtituloId);
    this.tablaItem.subtituloId = subtituloId;
    this.tablaItem.limpiarBody();
    this.tablaItem.listar(subtituloId);
    $("#formTableItem").removeClass("oculto");
  },
  //eventos tabla de items
  inputTextEscribirItem: function(event){
    this.tablaItem.inputTextEscribir(event);
  },
  quitarFilaItem: function(event){
    this.tablaItem.quitarFila(event);
  },
  guardarTablaItem: function(event){
    this.tablaItem.extraData = {subtitulo_id: this.tablaItem.subtituloId};
    this.tablaItem.guardarTabla(event);
  },
  agregarFilaItem: function(event){
    this.tablaItem.agregarFila(event);
  },
});
