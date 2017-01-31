var Sequelize = require('sequelize');
var db = require('./db');

var Poll = db.define('poll', {
  id: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    primaryKey: true
  }
});

// Poll.findById = function (id) {
//   return Poll.findOne({ where: { id: id } });
// }

module.exports = Poll;
