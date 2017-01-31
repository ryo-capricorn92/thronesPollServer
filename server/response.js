var Sequelize = require('sequelize');
var db = require('./db');
var Poll = require('./poll');

var Response = db.define('response', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  oocName: Sequelize.STRING,
  response: Sequelize.STRING
});

Response.newResponse = function (id, res) {
  return Response.create(res)
    .then(function (newRes) {
      return Poll.findById(id)
        .then(function (poll) {
          if (!poll) {
            console.log('Poll was not found');
            return Poll.create({ id: id })
              .then(function (newPoll) {
                return newPoll.addResponse(newRes)
                  .then(function (poll) {
                    return poll.save();
                  });
              });
          }
          return poll.addResponse(newRes)
            .then(function (poll) {
              return poll.save();
            });
        });
    });
}

Response.getAllFromPoll = function (id) {
  if (typeof id !== 'string') {
    id += '';
  }
  if (id.length === 1) {
    id = '00' + id;
  } else if (id.length === 2) {
    id = '0' + id;
  }
  return Poll.findById(id)
    .then(function (poll) {
      if (!poll) { return false }
      return poll.getResponses();
    });
}

Response.doubleCheck = function (pollId, oocName) {
  return Response.getAllFromPoll(pollId)
    .then(function (responses) {
      responses.forEach(function (res) {
        if (res.oocName === oocName) {
          return true;
        }
      });
      return false;
    });
}

Poll.hasMany(Response, { foreignKey: 'pollId' });

module.exports = Response;
