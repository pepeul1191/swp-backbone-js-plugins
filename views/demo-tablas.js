var TablaDepatartamentoView = TableView.extend({
  initialize: function(options){
    TableView.prototype.initialize.apply(this, [options])
    // asignacion dinamica de eventos
    this.events = this.events || {};
    //this.events["keyup #" + this.idNombre] = "buscarCooincidencias";
    //this.events["focusout #" + this.idNombre] = "limpiarSiVacio";
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
    var provinciaTable = new TablaProvinciaView({
      el: "#formTableProvincia",
      idTable: "tablaProvincias",
      targetMensaje: "mensajeRptaProvincias",
      mensajes: {
        errorListarAjax: "Error en listar los datos del servidor",
        errorGuardarAjax: "Error en guardar los datos en el servidor",
        success: "Se cargado guardo los cambios en las provincas",
      },
      urlListar: BASE_URL + "provincia/listar/" + departamentoId,
      urlGuardar: BASE_URL + "provincia/guardar",
      fila: {
        id: { // llave de REST
          tipo: "td_id",
          estilos: "color: blue; display:none",
          edicion: false,
        },
        nombre: { // llave de REST
          tipo: "text",
          estilos: "width: 250px;",
          edicion: true,
        },
        filaBotones: {
          estilos: "width: 80px"
        },
      },
      filaBotones: [
        {
          tipo: "i",
          claseOperacion: "ver-distrito",
          clase: "fa-list",
          estilos: "padding-left: 5px;",
        },
        {
          tipo: "i",
          claseOperacion: "quitar-fila",
          clase: "fa-times",
          estilos: "padding-left: 10px;",
        },
      ],
      collection: new ProvinciasCollection(),
      model: "Provincia",
    });
    provinciaTable.limpiarBody();
    provinciaTable.listar();
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
    var distritoTable = new TableView({
      el: "#formTableDistrito",
      idTable: "tablaDistritos",
      targetMensaje: "mensajeRptaDistritos",
      mensajes: {
        errorListarAjax: "Error en listar los datos del servidor",
        errorGuardarAjax: "Error en guardar los datos en el servidor",
        success: "Se cargado guardo los cambios en las provincas",
      },
      urlListar: BASE_URL + "distrito/listar/" + provinciaId,
      urlGuardar: BASE_URL + "distrito/guardar",
      fila: {
        id: { // llave de REST
          tipo: "td_id",
          estilos: "color: blue; display:none",
          edicion: false,
        },
        nombre: { // llave de REST
          tipo: "text",
          estilos: "width: 250px;",
          edicion: true,
        },
        filaBotones: {
          estilos: "width: 80px"
        },
      },
      filaBotones: [
        {
          tipo: "i",
          claseOperacion: "quitar-fila",
          clase: "fa-times",
          estilos: "padding-left: 15px;",
        },
      ],
      collection: new ProvinciasCollection(),
      model: "Provincia",
    });
    distritoTable.limpiarBody();
    distritoTable.listar();
  },
});
