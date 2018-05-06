var Departamento = Backbone.Model.extend({
  defaults: {
    nombre: '',
    id: 'E',
  },
  initialize: function() {
  },
  toString: function(){
    return "Departamento { id: " +  this.get("id") + " - " + "nombre: '" + this.get("nombre") + "' }";
  },
});
