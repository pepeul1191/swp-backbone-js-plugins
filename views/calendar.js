var CalendarView = Backbone.View.extend({
	//el: "#formUbicaciones", definido en el constructor
	initialize: function(params){
    // inicializar variables
    this.data = params["data"];
    this.body = document.getElementById(params["body"]);
    this.next = params["next"];
    this.previous = params["previous"];
    this.label = document.getElementById(params["label"]);
    this.meses = params["meses"];
    this.disablePastDays = params["disablePastDays"];
    this.activeDates = params["activeDates"];
    this.date = params["date"];
    this.date.setDate(1);
    this.todaysDate = params["todaysDate"];
    this.crearBody();
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events["click #" + this.next] = "mesSiguiente";
		this.events["click #" + this.previous] = "mesAnterior";
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
  },
  mesSiguiente: function(event){
    this.limpiarBody();
    var nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.crearBody();
  },
  mesAnterior: function(event){
    this.limpiarBody();
    var prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.crearBody();
  },
  limpiarBody: function(){
    this.body.innerHTML = "";
  },
  crearBody: function(){
    var currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth){
      this.crearDia(
        this.date.getDate(),
        this.date.getDay(),
        currentMonth,
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
    /*
    if(this.model.existe(year + "-" + (mes + 1) + "-" + num)){
      newDay.classList.add("vcal-date--selected");
    }
    */
    newDay.appendChild(dateEl);
    this.body.appendChild(newDay);
  },
  monthsAsString: function (monthIndex) {
    return this.meses[monthIndex]
  },
});
