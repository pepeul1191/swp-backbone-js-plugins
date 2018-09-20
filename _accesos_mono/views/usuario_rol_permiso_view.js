var UsuarioRolPermisoView = ModalView.extend({
  usuarioId: null,
  initialize: function(options){
    this.targetMensaje = options["targetMensaje"];
    // herencia de atributos, móetodos y eventos
    ModalView.prototype.initialize.apply(this, [options])
    this.inheritEvents(ModalView);
    // delegación de eventos
    this.delegateEvents();
    this.tablaPermiso = new TableView(dataTablaUsuarioPermiso);
    this.tablaRol = new TableView(dataTablaUsuarioRol);
  },
  events: {
    // tabla roles de usuario
    "change #tablaUsuarioRol > tbody > tr > td > .input-check": "clickCheckBoxRolUsuario",
    "click #tablaUsuarioRol > tfoot > tr > td > button.guardar-tabla": "guardarTablaRolUsuario",
    // tabla permisos de usuario
    "change #tablaUsuarioPermiso > tbody > tr > td > .input-check": "clickCheckBoxPermisoUsuario",
    "click #tablaUsuarioPermiso > tfoot > tr > td > button.guardar-tabla": "guardarTablaPermisoUsuario",
  },
  clickCheckBoxRolUsuario: function(event){
    this.tablaRol.clickCheckBox(event);
  },
  guardarTablaRolUsuario: function(event){
    this.tablaRol.extraData = {
      sistema_id: this.tablaRol.sistemaId,
      usuario_id: this.tablaRol.usuarioId,
    };
    this.tablaRol.guardarTabla(event);
  },
  clickCheckBoxPermisoUsuario: function(event){
    this.tablaPermiso.clickCheckBox(event);
  },
  guardarTablaPermisoUsuario: function(event){
    this.tablaPermiso.extraData = {
      sistema_id: this.tablaPermiso.sistemaId,
      usuario_id: this.tablaPermiso.usuarioId,
    };
    this.tablaPermiso.guardarTabla(event);
  },
});
