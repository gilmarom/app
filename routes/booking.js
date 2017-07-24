var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/tasks',['orders']);


// Get All orders
router.get('/orders', function(req, res, next){
    db.orders.find(function(err, orders){
        if(err){
            res.send(err);
        }
        res.json(orders);
    });
});

module.exports = router;
