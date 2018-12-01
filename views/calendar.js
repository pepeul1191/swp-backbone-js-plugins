var CalendarView = Backbone.View.extend({
	//el: "#formUbicaciones", definido en el constructor
	initialize: function(params){
    // inicializar variables
    this.body = document.getElementById(params["body"]);
    this.next = params["next"];
    this.previous = params["previous"];
    this.label = document.getElementById(params["label"]);
    this.targetSeleccion = document.getElementById(params["targetSeleccion"]);
    this.meses = params["meses"];
    this.disablePastDays = params["disablePastDays"];
    this.disabledClick = params["disabledClick"];
    this.activeDates = params["activeDates"];
    this.date = params["date"]; this.date.setDate(1);
    this.model = params["model"];
    this.collection = params["collection"];
    this.todaysDate = params["todaysDate"];
   // asignacion dinamica de eventos
    //this.events = this.events || {};
    //this.events["click #" + this.next] = "mesSiguiente";
    //this.events["click #" + this.previous] = "mesAnterior";
    //this.delegateEvents();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "click div.vcal-date--active": "seleccionarDia",
    ["click " + this.next]: "mesSiguiente",
    ["click " + this.previous]: "mesAnterior",
  },
  cargarSelecciones: function(datos){
    for(var i = 0; i < datos.length; i++){
      var modelo = new window[this.model]({fecha: datos[i]});
      this.collection.add(modelo);
    }
  },
  seleccionarDia: function(event){
    if(this.disabledClick != true){
      var target = null;
      if(event.target.nodeName == "SPAN"){
        target = event.target.parentElement;
      }else{
        target = event.target;
      }
      var diaSeleccion = target.getAttribute("data-calendar-date");
      this.targetSeleccion.innerHTML = diaSeleccion;
      if (target.classList.contains('vcal-date--selected')) {
        target.classList.remove('vcal-date--selected');
        var viewCollection = this.collection;
        var modelo = this.collection.where({fecha: diaSeleccion});
        this.collection.remove(modelo);
      }else{
        target.classList.add('vcal-date--selected')
        var modelo = new window[this.model]({fecha: diaSeleccion});
        this.collection.add(modelo);
      }
    }
  },
  mesSiguiente: function(event){
    this.limpiarBody();
    var mesSiguiente = this.date.getMonth() + 1;
    this.date.setMonth(mesSiguiente);
    this.crearBody();
  },
  mesAnterior: function(event){
    this.limpiarBody();
    var mesAnterior = this.date.getMonth() - 1;
    this.date.setMonth(mesAnterior);
    this.crearBody();
  },
  limpiarBody: function(){
    this.body.innerHTML = "";
  },
  crearBody: function(){
    var mesActual = this.date.getMonth();
    while (this.date.getMonth() === mesActual){
      this.crearDia(
        this.date.getDate(),
        this.date.getDay(),
        mesActual,
        this.date.getFullYear(),
      );
      this.date.setDate(this.date.getDate() + 1);
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);
    this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + " " + this.date.getFullYear();
    //this.dateClicked();
  },
  crearDia: function(num, day, mes, year){
    var newDay = document.createElement("div");
    var dateEl = document.createElement("span");
    dateEl.innerHTML = num;
    newDay.className = "vcal-date";
    newDay.setAttribute("data-calendar-date", year + "-" + (mes + 1) + "-" + num);
    // if it"s the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + "%";
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + "%";
      }
    }
    if (this.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add("vcal-date--disabled");
    } else {
      newDay.classList.add("vcal-date--active");
      newDay.setAttribute("data-calendar-status", "active");
    }
    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add("vcal-date--today");
    }
    this.collection.each(function(model){
      if(model.get("fecha") == (year + "-" + (mes + 1) + "-" + num)){
        newDay.classList.add("vcal-date--selected");
      }
    });
    newDay.appendChild(dateEl);
    this.body.appendChild(newDay);
  },
  monthsAsString: function (monthIndex) {
    return this.meses[monthIndex]
  },
});
