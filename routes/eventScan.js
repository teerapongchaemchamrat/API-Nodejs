'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController_Scan');
const router = express.Router();


router.get('/employee', eventControll.getAllProduct);
router.get('/chart/data', eventControll.createChartEm);
router.get('/check/:id', eventControll.getCheckEM);
router.post('/add', eventControll.addProduct);
router.get('/total/:id', eventControll.getTotal);
router.get('/total/match/:id', eventControll.getLocationMatch);
router.get('/total/nomatch/:id', eventControll.getLocationNoMatch);

var path = require('path')
router.use(express.static('public'))
router.get('/chart',function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.sendFile(path.resolve(__dirname,'D:/Application_API/index.html'))
});

router.get('/report',function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.sendFile(path.resolve(__dirname,'D:/Application_API/Report_ScanEm.html'))
});



module.exports = {
    routes: router
}