$( document ).ready(function() {
	var home_template = $("#template").html();
	var template = Handlebars.compile(home_template);

	Handlebars.registerPartial("header", $("#header-template").html());
	Handlebars.registerPartial("breadcrumb", $("#breadcrumb-template").html());
	Handlebars.registerPartial("contenido", $("#contenido-template").html());
	Handlebars.registerPartial("yield", $("#yield").html());
	Handlebars.registerPartial("footer", $("#footer-template").html());

	var data = {
		'BASE_URL' : BASE_URL,
		'STATICS_URL' : STATICS_URL,
		'DATA' : DATA,
		'ITEMS_JSON' : ITEMS_JSON
	};
	var template_compiled = template(data);

	$("#app").html(template_compiled);

	$(".dropdown").click(function(e) {
		var url = $(e.currentTarget).children().eq(0).attr("href");
		window.location.href = url;
	});
});

Handlebars.registerHelper( "menuModulos", function (){
	var rpta = '';
	MODULOS_JSON.forEach(function(modulo) {
    console.log(DATA['modulo']);
    console.log(modulo['nombre']);
    console.log("++++++++++++++++++++++++++++++++++++");
		if (DATA['modulo'] == modulo['nombre']){
			rpta = rpta + "<a href='" + BASE_URL + modulo['url'] + "' class='nav-active'>" + modulo['nombre'] + "</a>";
		}else{
			rpta = rpta + "<a href='" + BASE_URL + modulo['url'] + " class=''>" + modulo['nombre'] + "</a>";
		}

	});
	return rpta;
});

Handlebars.registerHelper( "menuSubModulos", function (){
	var rpta = '';
	ITEMS_JSON.forEach(function(submodulo) {
	  rpta = rpta + '<li class="li-submodulo">' + submodulo['subtitulo'] + "</li>";
		submodulo['items'].forEach(function(item){
			rpta = rpta + '<li class="li-item"><a href="'+ BASE_URL + item['url']  + '">' + item['item'] + '</a></li>';
		});
	});
	return rpta;
});

Handlebars.registerHelper('getValue', function(obj, key) {
  return obj[key];
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('fillSelect', function(lista, item_selected_id){
	var rpta = '';
	lista.forEach(function(item){
		if(item.id == item_selected_id){
			rpta = rpta + '<option value="' + item.id + '" selected>' + item.nombre + '</option>';
		}else{
			rpta = rpta + '<option value="' + item.id + '">' + item.nombre + '</option>';
		}
	});
	return rpta;
});
