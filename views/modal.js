var ModalView = Backbone.View.extend({
	//el: "#formUbicaciones", definido en el constructor
	initialize: function(params){
    // inicializar variables
    this.btnModal = document.getElementById("btnModal");
    this.containerModal = document.getElementById("containerModal");
    this.urlTemplate = params["urlTemplate"];
    this.handlebarsTemplateId = params["handlebarsTemplateId"];
    this.context = params["context"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click .close": "triggerCloseFunction",
  },
  render: function(){
    //trigear el click el botón oculto
    this.btnModal.click();
    //cargar template como script de handlebars en el container del modal
    this.$el.html(this.getTemplate());
    //compilar template de handlebars con los datos del contexto
    var source = $("#" + this.handlebarsTemplateId).html();
    var template = Handlebars.compile(source);
    var html = template(this.context);
    this.$el.html(html);
  },
  getTemplate: function(){
    var template = null;
    var viewInstance = this;
    $.ajax({
       url: viewInstance.urlTemplate,
       type: "GET",
       async: false,
       success: function(source) {
         template = source
       }
    });
    return template;
  },
  triggerCloseFunction: function(){
    alert();
  },
});
