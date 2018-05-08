## Backbone JS Plugins SWP

Descargas dependencias:

    $ npm install && bower install && bundler install

Crear 'dist' con Gulp:

    $ gulp libs

Arrancar aplicación servidor NodeJS:

    $ npm start

Arrancar aplicación servidor Ruby:

    $ ruby server.rb

Para corregir el error ENOSPC en caso de presentarse:

    $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

---

Fuentes:

+ https://github.com/expressjs
+ http://docs.sequelizejs.com/manual/tutorial/models-definition.html
+ https://github.com/pepeul1191/nodejs-hapi-ubicaciones.git
+ https://stackoverflow.com/questions/13761992/backbone-js-dynamic-events-with-variables?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
+ https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-model
+ https://stackoverflow.com/questions/16533440/backbone-js-iterate-a-collection?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
+ https://coursework.vschool.io/testing-javascript-with-jasmine/
+ https://www.npmjs.com/package/express-fileupload
+ https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
