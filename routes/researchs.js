var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/research',['research']);

// Get All Tasks
router.get('/researchs', function(req, res, next){
    db.research.find(function(err, research){
        if(err){
            res.send(err);
        }
        res.json(research);
    });
});

module.exports = router;