

var express = require('express');
var router = express.Router();
var Search=require('../module/search');

router.get('/', function(req, res, next) {
    var idea =new Search({
        key:encodeURI(req.query.guanjianci ),
        page:req.query.page

    });
    console.log(req.query.page);
idea.find(function(err,reldata){
        res.render('show',{
            title: req.query.guanjianci,
            data:reldata
        });
    });

});
module.exports = router;