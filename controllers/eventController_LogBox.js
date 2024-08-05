'use strict';

const BoxData = require('../data/LogBox');

const getAllLogBox = async (req, res, next) => {
    try {
        const getlist = await BoxData.getLogBox();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLogBoxbyId = async (req, res, next) => {
    try {
        const BoxId = req.params.id;
        const event = await BoxData.getById(BoxId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLastActiveBox = async (req, res, next) => {
    try {
        const BoxId = req.params.id;
        const event = await BoxData.getLast(BoxId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addLogBox = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await BoxData.createLogBox(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports={
    addLogBox,
    getAllLogBox,
    getLogBoxbyId,
    getLastActiveBox
}
