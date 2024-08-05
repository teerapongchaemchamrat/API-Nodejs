'use strict';

const express = require('express');
const eventController_BoxCtrl = require('../controllers/eventController_BoxCtrl');
const eventController_Out = require('../controllers/eventController_Out');
const eventController_Vendor = require('../controllers/eventController_Vendor');
const eventController_LogBox = require('../controllers/eventController_LogBox');
const { getLogBox } = require('../data/LogBox');
const router = express.Router();

const {getAllProduct} = eventController_BoxCtrl;
const {addProduct} = eventController_BoxCtrl;
const {getProductbyId} = eventController_BoxCtrl;
const {updateProduct} = eventController_BoxCtrl;
const {deleteProduct} = eventController_BoxCtrl;

const {getAllProductOut} = eventController_Out;
const {addProductOut} = eventController_Out;
const {getProductbyIdOut} = eventController_Out;
const {updateProductOut} = eventController_Out;

const {getAllVendor} = eventController_Vendor;
const {VendorUpdate} = eventController_Vendor;
const {deleteVendor} = eventController_Vendor;
const {addVendor} = eventController_Vendor;

const {addLogBox} = eventController_LogBox;
const {getAllLogBox}= eventController_LogBox;
const {getLogBoxbyId} = eventController_LogBox;
const {getLastActiveBox} = eventController_LogBox;


router.get('/BoxCtrl', getAllProduct);
router.post('/BoxCtrl/add', addProduct);
router.get('/BoxCtrl/get/:id', getProductbyId);
router.put('/BoxCtrl/update/:id', updateProduct);
router.delete('/BoxCtrl/delete/:id',deleteProduct,);

//router.get('/CtrlBox_Out/get', getAllProductOut);
//router.post('/addBox_Out', addProductOut);
//router.get('/CtrlBox_Out/:id', getProductbyIdOut);
//router.put('/CtrlBox_Out/update/:id', updateProductOut);

router.get('/Vendor/get',getAllVendor);
//router.delete('/BoxTrans/delete/:id',deleteTransBox);
//router.put('/BoxTrans/update/:id', TransBoxUpdate);
router.post('/Vendor/add',addVendor);

router.post('/LogBox/add',addLogBox);
router.get('/LogBox/get',getAllLogBox);
router.get('/Logbox/get/:id',getLogBoxbyId);
router.get('/LogBox/getlast/:id',getLastActiveBox);

module.exports = {
    routes: router
}