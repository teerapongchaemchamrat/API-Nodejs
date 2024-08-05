'use strict';

const BoxData = require('../data/TransBox');

const getAllTransBox = async (req, res, next) => {
    try {
        const getlist = await BoxData.getTransBox();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const TransBoxUpdate = async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const updated = await BoxData.updateTranboxbyId(BoxId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTransBox= async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const del = await BoxData.deleteTransBoxbyId(BoxId, data);
        res.send(del);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
    module.exports= {
        getAllTransBox,
        deleteTransBox,
        TransBoxUpdate
    }