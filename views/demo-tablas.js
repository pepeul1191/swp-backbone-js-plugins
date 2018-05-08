var TablaDepatartamentoView = TableView.extend({
  initialize: function(options){
    TableView.prototype.initialize.apply(this, [options])
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.listenTo(this.collection, "change", this.onChange, this);
    this.delegateEvents();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click i.ver-provincia": "verProvincias",
    "keyup input.text": "inputTextEscribir",
    "click i.quitar-fila": "quitarFila",
    "click button.agregar-fila": "agregarFila",
    "click button.guardar-tabla": "guardarTabla",
  },
  verProvincias: function(event){
    var departamentoId = event.target.parentElement.parentElement.firstChild.innerHTML;
    //urlListar: BASE_URL + "provincia/listar/" + departamentoId,
    provinciaTable.urlListar = BASE_URL + "provincia/listar/" + departamentoId;
    provinciaTable.el.classList.remove("oculto");
    provinciaTable.limpiarBody();
    provinciaTable.listar();
    distritoTable.limpiarBody();
    distritoTable.el.classList.add("oculto");
  },
});

var TablaProvinciaView = TableView.extend({
  initialize: function(options){
    TableView.prototype.initialize.apply(this, [options])
    this.foo = 'bar';
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click i.ver-distrito": "verDistrito",
    "keyup input.text": "inputTextEscribir",
    "click i.quitar-fila": "quitarFila",
    "click button.agregar-fila": "agregarFila",
    "click button.guardar-tabla": "guardarTabla",
  },
  verDistrito: function(event){
    var provinciaId = event.target.parentElement.parentElement.firstChild.innerHTML;
    distritoTable.urlListar = BASE_URL + "distrito/listar/" + provinciaId;
    distritoTable.limpiarBody();
    distritoTable.listar();
    distritoTable.el.classList.remove("oculto");
  },
});
