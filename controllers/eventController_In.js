'use strict';

const BoxDataIn = require('../data/BoxCtrl');


const getAllProductIn = async (req, res, next) => {
    try {
        const getlist = await BoxDataIn.getProductIn();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProductbyIdIn = async (req, res, next) => {
    try {
        const BoxId = req.params.id;
        const event = await BoxDataIn.getByIdIn(BoxId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProductIn = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await BoxDataIn.creatProductIn(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProductIn = async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const updated = await BoxDataIn.updateProductbyIdIn(BoxId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllProductIn,
    addProductIn,
    getProductbyIdIn,
    updateProductIn
}