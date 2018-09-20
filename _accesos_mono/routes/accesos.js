function limpiarURL(url_original, parametro){
  return url_original + parametro;
}

var accesosRouter = Backbone.Router.extend({
  moduloView: null,
  permisoView: null,
  rolView: null,
  usuarioView: null,
  usuarioLogView: null,
  usuarioDetalleView: null,
  usuarioRolPermisoView: null,
  initialize: function() {
  },
  routes: {
    "": "index",
    "modulo" : "moduloIndex",
    "permiso" : "permisoIndex",
    "rol" : "rolIndex",
    "usuario/logs/:usuario_id" : "usuarioLog",
    "usuario/editar/:usuario_id" : "usuarioDetalle",
    "usuario/roles_permisos/:usuario_id" : "usuarioRolPermiso",
    "usuario" : "usuarioIndex",
    "*actions" : "default",
  },
  index: function(){
    window.location.href = BASE_URL + "accesos/#/modulo";
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
  },
  //modulo
  moduloIndex: function(){
    if(this.moduloView == null){
      this.moduloView = new ModuloView();
    }
    this.moduloView.render();
    this.moduloView.tablaModulo.listar();
  },
  //permiso
  permisoIndex: function(){
    if(this.permisoView == null){
      this.permisoView = new PermisoView();
    }
    this.permisoView.render();
    this.permisoView.tablaPermiso.listar();
  },
  //rol
  rolIndex: function(){
    if(this.rolView == null){
      this.rolView = new RolView();
    }
    this.rolView.render();
    this.rolView.tablaRol.listar();
  },
  //usuario
  usuarioIndex: function(){
    if(this.usuarioView == null){
      this.usuarioView = new UsuarioView();
    }
    this.usuarioView.render();
    this.usuarioView.tablaUsuario.listar();
  },
  usuarioLog: function(usuario_id){
    if(this.usuarioLogView == null){
      this.usuarioLogView = new UsuarioLogView(dataUsuarioLogView);
    }
    this.usuarioLogView.render();
    //this.sistemaRolView.usuarioId = usuario_id;
    //this.usuarioLogView.tablaUsuario.listar();
  },
  usuarioDetalle: function(usuario_id){
    if(this.usuarioDetalleView == null){
      this.usuarioDetalleView = new UsuarioDetalleView(dataUsuarioDetalleView);
    }
    this.usuarioDetalleView.set("usuario_id", usuario_id);
    this.usuarioDetalleView.llenarSelect();
    this.usuarioDetalleView.obtenerUsuarioCorreo();
    this.usuarioDetalleView.context.usuario = this.usuarioDetalleView.model;
    this.usuarioDetalleView.context.estados = this.usuarioDetalleView.estadoUsuariosSelect.toJSON();
    this.usuarioDetalleView.render();
  },
  usuarioRolPermiso: function(usuario_id){
    if(this.usuarioRolPermisoView == null){
      this.usuarioRolPermisoView = new UsuarioRolPermisoView(dataUsuarioRolPermisoView);
    }
    this.usuarioRolPermisoView.set("usuario_id", usuario_id);
    this.usuarioRolPermisoView.context.usuario_id = usuario_id;
    this.usuarioRolPermisoView.render();


    this.usuarioRolPermisoView.tablaRol.urlListar =
      limpiarURL(BASE_URL + "accesos/usuario/rol/" , usuario_id);
    this.usuarioRolPermisoView.tablaRol.listar();
    this.usuarioRolPermisoView.tablaRol.usuarioId = usuario_id;
    //llenar tabla de permisos
    this.usuarioRolPermisoView.tablaPermiso.urlListar =
      limpiarURL(BASE_URL + "accesos/usuario/permiso/" , usuario_id);
    this.usuarioRolPermisoView.tablaPermiso.listar();
    this.usuarioRolPermisoView.tablaPermiso.usuarioId = usuario_id;
  },
});

$(document).ready(function(){
  router = new accesosRouter();
  Backbone.history.start();
})
