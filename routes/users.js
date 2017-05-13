var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
var db = mongojs(config.connectionString,['users']);

// Register new users
router.post('/users', function(req, res) {
  var user = req.body;

  if(!user.firstName || !user.lastName || !user.username || !user.password){
    res.status(400);
    res.json({
        "error": "Bad Data"
    });
  } else {
    // Attempt to save the user
    db.users.save(user, function(err, user){
      if(err){
          res.send(err);
      }
      res.json(user);
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/users/authenticate', function(req, res) {

  console.log(JSON.stringify(req.body));

  if (!req.body.username || !req.body.password){
    res.status(400);
    res.json({
        "error": "Bad Data"
    });
    return;
  }
  // find a document using a native ObjectId

  db.users.findOne({
  	username: req.body.username
  }, function(err, doc) {
    if (err) throw err;
    if(!doc){
      res.status(400);
      res.json({"error": "Authentication failed. Wrong username or password"});
    }else{
      if (req.body.password === doc.password){
        var user = doc;
        // Create token if the password matched and no error was thrown
        var token = jwt.sign(user, config.secret, {
          expiresIn: 10080 // in seconds
        });
        res.json({ success: true, token: 'JWT ' + token });
      }
      else{
        res.status(400);
        res.send({"error": "Authentication failed. Wrong username or password"});
      }
    }
  })
});

router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

module.exports = router;
