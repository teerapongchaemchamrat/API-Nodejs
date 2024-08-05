'use strict';

const PhotoData = require('../data/Delivery');

const GetAll = async (req, res, next) => {
    try{
        const getall = await PhotoData.getAll();
        res.send(getall);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const GetById = async ( req, res, next) => {
    try{
        const co = req.params.co;
        const date = req.params.date;
        const event = await PhotoData.getById(co,date);
        res.send(event);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports={
    GetAll,
    GetById
}