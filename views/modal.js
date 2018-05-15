var ModalView = Backbone.View.extend({
	//el: "#formUbicaciones", definido en el constructor
	initialize: function(params){
    // inicializar variables
    this.btnModal = document.getElementById("btnModal");
    this.containerModal = document.getElementById(params["containerModal"]);
    this.urlTemplate = params["urlTemplate"];
    this.handlebarsTemplateId = params["handlebarsTemplateId"];
    this.context = params["context"];
    this.closeFunction = params["closeFunction"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "keydown": "keyAction",
    "click .close": "triggerCloseFunction",
    "click .modal": "triggerCloseFunctionClickBackground",
  },
  render: function(){
    //trigear el click el botón oculto
    this.btnModal.click();
    //cargar template como script de handlebars en el container del modal
    this.containerModal.innerHTML = this.getTemplate();
    //compilar template de handlebars con los datos del contexto
    var source = $("#" + this.handlebarsTemplateId).html();
    var template = Handlebars.compile(source);
    var html = template(this.context);
    this.containerModal.innerHTML = html;
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
  keyAction: function(event){
    var code = event.keyCode || event.which;
    if(code == 27 && this.$el.hasClass("modal-open")){ //se ha presionado la tecla Esc
      $(".close").click();
    }
  },
  modalClose: function(){
    console.log(this.$el);
  },
  triggerCloseFunction: function(){
    this.closeFunction();
  },
  triggerCloseFunctionClickBackground: function(event){
		//console.log(event.target.parentElement.tagName);
    if(event.target.parentElement.tagName == "BODY"){
      this.triggerCloseFunction();
    }
  },
});
