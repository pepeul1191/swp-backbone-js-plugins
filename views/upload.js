var UploadView = Backbone.View.extend({
	//el: "#formUbicaciones",
	initialize: function(params){
    // inicializar variables
    this.imagenId = params["imagenId"];
    this.inputFileId = params["inputFileId"];
    this.buscarBtnId = params["buscarBtnId"];
    this.subirBtnId = params["subirBtnId"];
    this.verBtnId = params["verBtnId"];
    this.mensajes = params["mensajes"];
		this.url = params["url"];
		this.model = params["model"];
    this.extraData = params["extraData"];
    this.fileName = params["fileName"];
		this.maxSize = params["maxSize"];
		this.allowTypes = params["allowTypes"];
		this.lblMensaje = params["lblMensaje"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events["click #" + this.buscarBtnId] = "triggerInputFile";
    this.events["click #" + this.subirBtnId] = "subirFile";
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
		"click #verModelo": "verModelo",
  },
  triggerInputFile: function() {
    $("#" + this.inputFileId).trigger("click");
  },
	verModelo: function(event){
		console.log(this.model.toString());
	},
  subirFile: function() {
    var formData = new FormData();
		// anexar archivo si es formato y tamaño válido
		var file = $("#" + this.inputFileId)[0].files[0];
		if(!_.contains(this.allowTypes, file.type)){
			$("#" + this.lblMensaje).removeClass("color-success");
			$("#" + this.lblMensaje).removeClass("color-warning");
			$("#" + this.lblMensaje).addClass("color-rojo");
			$("#" + this.lblMensaje).html(this.mensajes.formatoNoValido);
		}else{
			if(file.size > this.maxSize){
				$("#" + this.lblMensaje).removeClass("color-success");
        $("#" + this.lblMensaje).removeClass("color-warning");
        $("#" + this.lblMensaje).addClass("color-rojo");
        $("#" + this.lblMensaje).html(this.mensajes.tamanioNoValido);
			}else{
				formData.append(this.fileName, file);
		    // anexar al formData los datos extras a enviar
		    for(var i = 0; i < this.extraData.length; i++){
		      formData.append(this.extraData[i]["llave"], $("#" + this.extraData[i]["domId"]).val());
		    }
		    //for(var pair of formData.entries()) {console.log(pair[0]+ ', ' + pair[1]);}
		    var viewInstance = this;
		    $.ajax({
		      type: "POST",
		      url: viewInstance.url,
		      data: formData,
		      //use contentType, processData for sure.
		      contentType: false,
		      processData: false,
		      beforeSend: function() {
		        $("#" + viewInstance.subirBtnId).attr("disabled", "true");
		      },
		      success: function(data) {
		        console.log(data);
		        $("#" + viewInstance.subirBtnId).removeAttr("disabled");
		      },
		      error: function(error) {
		        console.log(error);
		        $("#" + viewInstance.subirBtnId).removeAttr("disabled");
		      }
		    });
			}
		}
  },
});
