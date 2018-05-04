## Backbone JS Plugins SWP

Descargas dependencias:

    $ npm install && bower install

Crear 'dist' con Gulp:

    $ gulp libs

Arrancar aplicación servidor:

    $ npm start

Instalar PhantomJs para realizar pruebas:

    $ sudo apt-get update
    $ sudo apt-get install build-essential chrpath libssl-dev libxft-dev libfreetype6-dev libfreetype6 libfontconfig1-dev libfontconfig1 -y
    $ sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
    $ sudo tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
    $ sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/
    $ phantomjs --version

Ejecutar las pruebas Phantom:

    $ cd tests/phantom
    $ phatomjs <<nombre_archivo.js>>

---

Fuentes:

+ https://github.com/expressjs
+ http://docs.sequelizejs.com/manual/tutorial/models-definition.html
+ https://github.com/pepeul1191/nodejs-hapi-ubicaciones.git
+ https://stackoverflow.com/questions/13761992/backbone-js-dynamic-events-with-variables?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
+ https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-model
+ https://stackoverflow.com/questions/16533440/backbone-js-iterate-a-collection?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
+ https://www.vultr.com/docs/how-to-install-phantomjs-on-ubuntu-16-04
+ http://phantomjs.org/
