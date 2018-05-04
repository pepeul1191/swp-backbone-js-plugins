var constants = require('../config/constants');
var page = require('webpage').create();

page.open(constants.data.base_url + 'demos/autocompletar.html', function (status) {
  //Page is loaded!
  console.log(status);
  phantom.exit();
});
