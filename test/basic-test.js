var tipJS = require("./../tipJS/tipJS.2.0.0.dev.js");

exports.testCheckExistProperties = function(test) {
  test.ok(typeof tipJS === 'object', "tipJS object exists");
  test.done();
};