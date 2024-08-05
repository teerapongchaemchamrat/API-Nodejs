'use strict';

const express = require('express');
const eventController_In = require('../controllers/eventController_BoxCtrl');
const eventController_Out = require('../controllers/eventController_Out');
const eventController_Box_on_Vendor = require('../controllers/eventController_Box_on_Vendor');
const router = express.Router();

const {getAllProductIn} = eventController_In;
const {addProductIn} = eventController_In;
const {getProductbyIdIn} = eventController_In;
const {updateProductIn} = eventController_In;

const {getAllProductOut} = eventController_Out;
const {addProductOut} = eventController_Out;
const {getProductbyIdOut} = eventController_Out;
const {updateProductOut} = eventController_Out;

const {getAllBoxOnVendor} = eventController_Box_on_Vendor;


router.get('/CtrlBox_In', getAllProductIn);
router.post('/addBox_In', addProductIn);
router.get('/CtrlBox_In/:id', getProductbyIdIn);
router.put('/CtrlBox_In/update/:id', updateProductIn);

router.get('/CtrlBox_Out/get', getAllProductOut);
router.post('/addBox_Out', addProductOut);
router.get('/CtrlBox_Out/:id', getProductbyIdOut);
router.put('/CtrlBox_Out/update/:id', updateProductOut);

router.get('/Box_on_Vendor/get',getAllBoxOnVendor);


module.exports = {
    routes: router
}