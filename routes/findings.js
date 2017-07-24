var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var PythonShell = require('python-shell');
var jsonObj = require('../client/app/components/analytics/datascience/data.json');

// Get All Tasks
router.get('/findings', function(req, res){
        var content;
        fs.readFile('./client/app/components/analytics/datascience/data.json','utf8',function read(err, findings){
        if (err) throw err;
        
        //console.log(findings);
        findings =JSON.parse(findings);
        res.json(findings);
        console.log(findings);
});     
 });



//Save Task


 
module.exports = router;
