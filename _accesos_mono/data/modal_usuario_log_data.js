var dataUsuarioLogView = {
  el: "body",
  containerModal: "modal-container",
  urlTemplate: STATICS_URL + "bower_components/swp-backbone/_accesos_mono/templates/usuario_log.html",
  handlebarsTemplateId: "usuario-log-template",
  targetMensaje: "mensajeRptaLog",
  context: {
    titulo_modal: "Log de Accesos al Usuario",
  },
  closeFunction: function(){
    location.replace(BASE_URL + "accesos/#/usuario");
  },
};
