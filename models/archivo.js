var Archivo = Backbone.Model.extend({
  defaults: {
    nombre_generado: '',
    id: 'E',
  },
  initialize: function() {
  },
  toString: function(){
    return "Archivo { id: " +  this.get("id") +
      " - " + "nombre_generado: '" + this.get("nombre_generado") + 
      "' }";
  },
});
