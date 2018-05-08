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
