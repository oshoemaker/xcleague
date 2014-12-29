var path = require('path');
var fs = require('fs');

function Controller() {
    var self = this;
    
    // Bind all controllers to this API instance. In doing this, we allow
    // controllers to access the models and such with `this.models`, etc.
    fs.readdirSync(path.join(process.cwd() + '/controllers'))
      .filter(function (c) {
        return /\.js$/.test(c);
      })
      .forEach(function (c) {
        c = require(path.join(process.cwd() + '/controllers', c));
        Object.keys(c).forEach(function (k) {
            self[k] = c[k].bind(self);
        });
      });
}

module.exports = new Controller();