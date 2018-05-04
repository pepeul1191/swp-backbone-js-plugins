var Distrito = Backbone.Model.extend({
  defaults: {
    nombre: '',
    id: 'E',
  },
  initialize: function() {
  },
  toString: function(){
    return "Distiro { id: " +  this.get("id") + " - " + "nombre: '" + this.get("nombre") + "' }";
  },
});
