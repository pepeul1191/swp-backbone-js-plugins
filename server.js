// modules de express
const express = require('express');
const path = require('path');
const logger = require('morgan');
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
// servidor express
var app = express();
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.set('Server', 'Ubuntu');
  res.set('Access-Control-Allow-Origin', '*');
  return next();
});
app.use(express.static(path.join(__dirname, '')));
app.listen(9090);
console.log('Listening on port 9090');
// rutas rest
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
