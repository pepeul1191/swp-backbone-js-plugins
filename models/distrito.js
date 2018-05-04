var Distrito = Backbone.Model.extend({
  defaults: {
    nombre: '',
    id: 'E',
  },
  initialize: function() {

  },
  buscarCooincidencias: function(nombreIngresado){
    var rpta = null;
    $.ajax({
      type: "GET",
      url: BASE_URL + "distrito/buscar",
      data: {nombre: nombreIngresado, csrfmiddlewaretoken: CSRF},
      async: false,
      success: function(data){
        rpta = data;
      },
      error: function(data){
        console.log("error");
        rpta = data;
      }
    });
    return rpta;
  },
});
