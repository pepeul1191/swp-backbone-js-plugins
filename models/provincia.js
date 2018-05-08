var Provincia = Backbone.Model.extend({
  defaults: {
    nombre: '',
    id: 'E',
  },
  initialize: function() {
  },
  toString: function(){
    return "Provincia { id: " +  this.get("id") + " - " + "nombre: '" + this.get("nombre") + "' }";
  },
});
