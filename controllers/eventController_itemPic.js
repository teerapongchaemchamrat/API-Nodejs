'use strict';

const eventData = require('../data/CYF_item_pic');

const getAllPicture = async (req, res, next) => {
    try {
        const item = req.params.id;
        const getlist = await eventData.getPicture(item);
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getJobRemain = async (req, res, next) => {
    try {
        //const job = req.params.id;
        const getlist = await eventData.getJobremain();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPicTest = async (req, res, next) => {
    try {
        const item = req.params.id;
        const getlist = await eventData.gettest(item);
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllPicture,
    getPicTest,
    getJobRemain
}