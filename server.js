// modules de express
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const async = require('async');
const unirest = require('unirest');
const base_url = 'http://localhost:9090/';
const servicio_url = 'http://localhost:4567/';
// funciones helper
function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
// servidor express
var app = express();
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.set('Server', 'Ubuntu');
  res.set('Access-Control-Allow-Origin', '*');
  return next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '')));
app.listen(9090);
console.log('Listening on port 9090');
// rutas rest
app.get('/', function (req, res) {
  res.redirect('/demos');
});
app.post('/archivo/subir',  bodyParser.text({ type: 'json' }), function (req, res) {
  var key1 = req.body.key1;
  var key2 = req.body.key2;
  let sampleFile = req.files.myFile;
  var tempFileNameArray = sampleFile.name.split(".");
  var randomVal = makeId();
  sampleFile.mv('uploads/' + randomVal + '.' + tempFileNameArray[tempFileNameArray.length - 1], function(err) {
    if (err){
      res.statusCode = 500;
      res.send(err);
    }
    var rpta = {
      'tipo_mensaje': 'success',
      'mensaje': [
        'Se ha registrado una nueva imagen', // mensaje
        randomVal, // imagenId
        base_url + 'uploads/' + randomVal + '.' + tempFileNameArray[tempFileNameArray.length - 1], // url imagen
      ]
    };
    res.send(JSON.stringify(rpta));
  });
});
app.get('/departamento/listar', function (req, res) {
  unirest.get(servicio_url + 'departamento/listar')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/distrito/buscar', function (req, res) {
  unirest.get(servicio_url + 'distrito/buscar?nombre=' + req.query.nombre)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.post('/departamento/guardar', function (req, res) {
  unirest.post(servicio_url + 'departamento/guardar?data=' + req.body.data)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/provincia/listar/:departamentoId', function (req, res) {
  unirest.get(servicio_url + 'provincia/listar/' + req.params.departamentoId)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.post('/provincia/guardar', function (req, res) {
  unirest.post(servicio_url + 'provincia/guardar?data=' + req.body.data)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/distrito/listar/:provinciaId', function (req, res) {
  unirest.get(servicio_url + 'distrito/listar/' + req.params.provinciaId)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/distrito/count', function (req, res) {
  unirest.get(servicio_url + 'distrito/count')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/distrito/buscar_pagina', function (req, res) {
  //BASE_URL + distrito/buscar_pagina?data={"step":10,"page":10}
  unirest.get(servicio_url + 'distrito/buscar_pagina?data=' + req.query.data)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.post('/distrito/guardar', function (req, res) {
  unirest.post(servicio_url + 'distrito/guardar?data=' + req.body.data)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/tipo_estacion/listar', function (req, res) {
  unirest.get(servicio_url + 'tipo_estacion/listar')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.get('/estacion/listar', function (req, res) {
  unirest.get(servicio_url + 'estacion/listar')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
app.post('/estacion/guardar', function (req, res) {
  unirest.post(servicio_url + 'estacion/guardar?data=' + req.body.data)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .send()
  .end(function (response) {
    //console.log(response.body);
    res.send(response.body);
  });
});
