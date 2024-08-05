'use strict';

const eventData = require('../data/ScanEmployee');

const getAllProduct = async (req, res, next) => {
    try {
        const getlist = await eventData.getProduct();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCheckEM = async (req, res, next) => {
    try{
        const employeeID = req.params.id;
        const getchecklist = await eventData.getCheck(employeeID);
        res.send(getchecklist);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getTotal = async (req, res, next) => {
    try{
        const param_date = req.params.id;
        const getlist = await eventData.getTotalDay(param_date);
        res.send(getlist);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getLocationMatch = async (req, res, next) => {
    try{
        const param_date = req.params.id;
        const getlist = await eventData.getlocationMatch(param_date);
        res.send(getlist);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getLocationNoMatch = async (req, res, next) => {
    try{
        const param_date = req.params.id;
        const getlist = await eventData.getlocationNoMatch(param_date);
        res.send(getlist);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const createChartEm = async (req, res, next) => {
    try {
        const getlist = await eventData.createChart();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.creatProduct(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllProduct,
    createChartEm,
    addProduct,
    getCheckEM,
    getTotal,
    getLocationMatch,
    getLocationNoMatch
}