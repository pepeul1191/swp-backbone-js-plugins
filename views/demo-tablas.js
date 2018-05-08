var TablaDepatartamentoView = TableView.extend({
  initialize: function(options){
    // herencia de atributos, móetodos y eventos
    TableView.prototype.initialize.apply(this, [options])
    this.inheritEvents(TableView);
    // delegación de eventos
    this.delegateEvents();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click i.ver-provincia": "verProvincias",
  },
  verProvincias: function(event){
    var departamentoId = event.target.parentElement.parentElement.firstChild.innerHTML;
    //urlListar: BASE_URL + "provincia/listar/" + departamentoId,
    provinciaTable.urlListar = BASE_URL + "provincia/listar/" + departamentoId;
    provinciaTable.el.classList.remove("oculto");
    provinciaTable.limpiarBody();
    provinciaTable.listar();
    provinciaTable.extraData = {departamento_id: departamentoId};
    distritoTable.limpiarBody();
    distritoTable.el.classList.add("oculto");
  },
});

var TablaProvinciaView = TableView.extend({
  initialize: function(options){
    // herencia de atributos, móetodos y eventos
    TableView.prototype.initialize.apply(this, [options])
    this.inheritEvents(TableView);
    // delegación de eventos
    this.delegateEvents();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click i.ver-distrito": "verDistrito",
  },
  verDistrito: function(event){
    var provinciaId = event.target.parentElement.parentElement.firstChild.innerHTML;
    distritoTable.urlListar = BASE_URL + "distrito/listar/" + provinciaId;
    distritoTable.limpiarBody();
    distritoTable.listar();
    distritoTable.extraData = {provincia_id: provinciaId};
    distritoTable.el.classList.remove("oculto");
  },
});
