'use strict';

const BoxData = require('../data/Vendor');

const getAllVendor = async (req, res, next) => {
    try {
        const getlist = await BoxData.getVendor();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addVendor = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await BoxData.createVendor(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const VendorUpdate = async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const updated = await BoxData.updateVendorbyId(BoxId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteVendor= async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const del = await BoxData.deleteVendorbyId(BoxId, data);
        res.send(del);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
    module.exports= {
        getAllVendor,
        deleteVendor,
        VendorUpdate,
        addVendor
    }