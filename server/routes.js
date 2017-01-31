var Poll = require('./poll');
var Response = require('./response');

module.exports = function (app, express) {

  // new poll response from thrones
  app.post('/newRes', function (req, res) {
    console.log('request body is ', req.body);
    console.log('Poll id is ' + req.body.pollId);
    console.log('OOC name is ' + req.body.oocName);
    console.log('Response is ' + req.body.response);
    Response.getAllFromPoll(req.body.pollId)
      .then(function (responses) {
        if (responses) {
          responses.forEach(function (response) {
            if (response.oocName === req.body.oocName) {
              res.json({
                error: true,
                alreadySubmitted: true
              });
            }
          });
        }
        Response.newResponse(req.body.pollId, { oocName: req.body.oocName, response: req.body.response })
          .then(function (poll) {
            res.json({
              error: false,
              success: true
            });
          })
      });
  });

  // get all polls for index page
  app.get('/polls', function (req, res) {
    Poll.findAll()
      .then(function (polls) {
        res.json({ polls: polls });
      });
  });

  // get responses from one poll
  app.get('/responses/:id', function (req, res) {
    Response.getAllFromPoll(req.params.id)
      .then(function (responses) {
        res.json({ responses: responses });
      });
  });
}
