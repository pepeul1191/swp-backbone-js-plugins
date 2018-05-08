// modules de express
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const async = require('async');
const base_url = 'http://localhost:9090/';
// funciones helper
function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
// modules de la base de datos
const Sequelize = require('sequelize');
// conexión a la base de datos
const sequelize = new Sequelize('database', 'username', 'password', {
  //host: 'localhost',
  dialect: 'sqlite',
  pool: {
     max: 5,
     min: 0,
     idle: 10000
  },
  storage: 'demo.db',
  define: {
    timestamps: false // true by default
  },
  logging: true,
});
const db = sequelize;
// modelos a la base de datos
const TipoEstacion = db.define('tipo_estaciones', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
});
const Estacion = db.define('estaciones', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT, allowNull: false, },
  descripcion: { type: Sequelize.TEXT, allowNull: false, },
  latitud: { type: Sequelize.DOUBLE, allowNull: false, },
  longitud: { type: Sequelize.DOUBLE, allowNull: false, },
  altura: { type: Sequelize.INTEGER, allowNull: false, },
	tipo_estacion_id: { type: Sequelize.INTEGER, references: {
		model: TipoEstacion, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});
const Departamento = db.define('departamentos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
});
const Provincia = db.define('provincias', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT, allowNull: false, },
	departamento_id: { type: Sequelize.INTEGER, references: {
		model: Departamento, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});
const Distrito = db.define('distritos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT, allowNull: false, },
	provincia_id: { type: Sequelize.INTEGER, references: {
		model: Provincia, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});
const DistritoProvinciaDepartamento = db.define('vw_distrito_provincia_departamento', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT },
});
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
app.get('/departamento/listar', function (req, res) {
  Departamento.findAll({
    attributes: ['id', 'nombre'],
  }).then(function(departamentos) {
    res.send(JSON.stringify(departamentos));
  }).catch((err) => {
    var rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en listar los departamentos',
        err.toString()
      ]
    }
    res.statusCode = 500;
    res.send(JSON.stringify(rpta));
  });
});
app.get('/tipo_estacion/listar', function (req, res) {
  TipoEstacion.findAll({
    attributes: ['id', 'nombre'],
  }).then(function(tipo_estaciones) {
    res.send(JSON.stringify(tipo_estaciones));
  }).catch((err) => {
    var rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en listar los tipo de estaciones',
        err.toString()
      ]
    }
    res.statusCode = 500;
    res.send(JSON.stringify(rpta));
  });
});
app.get('/distrito/buscar', function (req, res) {
  DistritoProvinciaDepartamento.findAll({
      attributes: ['id', 'nombre'],
      where: {
        nombre : {
          $like: req.query.nombre + '%'
        }
      },
      limit: 10,
    }).then(function(distritos) {
      res.send(JSON.stringify(distritos));
    }).catch((err) => {
      var rpta = {
        'tipo_mensaje': 'error',
        'mensaje': [
          'Se ha producido un error en buscar los distritos',
          err.toString()
        ]
      }
      res.statusCode = 500;
      res.send(JSON.stringify(rpta));
    });
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
app.post('/departamento/guardar', function (req, res) {
  var data = JSON.parse(req.body.data);
  var nuevos = data['nuevos'];
  var editados = data['editados'];
  var eliminados = data['eliminados'];
  var array_nuevos = [];
  return db.transaction(function (t) {
    var promises = [];
    eliminados.forEach(function(eliminado) {
      Departamento.destroy({
        where: {id: eliminado}
      }, {transaction: t})
      .error(function(err){
        return err;
      });
    });
    editados.forEach(function(editado) {
      Departamento.update({
        nombres: editado['nombre']
      }, {
        where: {id: editado['id']}
      }, {transaction: t})
      .error(function(err){
        console.log(err);
        return err;
      });
    });
    nuevos.forEach(function(nuevo) {
      var newPromises = Departamento.create({
        nombre: nuevo['nombre']
      }, {transaction: t});
        promises.push(newPromises);
     }).error(function(err){
       return err;
     });
    return Promise.all(promises).then(function(nuevos_promises) {
      var promises = [];
      var i = 0;
      nuevos_promises.forEach(function(promise){
        var temp = {
          'temporal': nuevos[i]['id'] ,
          'nuevo_id': promise['id']
        };
        promises.push(temp);
        i = i + 1;
      });
      return Promise.all(promises);
    });
  }).then(function (result) {
    var rpta = {
      'tipo_mensaje': 'success',
      'mensaje': [
        'Se ha registrado los cambios en los departamentos', result
      ]
    };
    //t.commit();
    res.send(JSON.stringify(rpta));
  }).catch(function (err) {
    var rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en guardar los departamentos',
        err.toString()
      ]
    }
    //t.rollback();
    res.statusCode = 500;
    res.send(JSON.stringify(rpta));
  });
});
