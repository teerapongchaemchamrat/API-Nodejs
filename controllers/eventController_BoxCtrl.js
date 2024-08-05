'use strict';

const BoxData = require('../data/BoxCtrl');


const getAllProduct = async (req, res, next) => {
    try {
        const getlist = await BoxData.getProduct();
        res.send(getlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProductbyId = async (req, res, next) => {
    try {
        const BoxId = req.params.id;
        const event = await BoxData.getById(BoxId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await BoxData.creatProduct(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const BoxId =  req.params.id;
        const data = req.body;
        const updated = await BoxData.updateProductbyId(BoxId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
    const deleteProduct= async (req, res, next) => {
        try {
            const BoxId =  req.params.id;
            const data = req.body;
            const del = await BoxData.deleteProductbyId(BoxId, data);
            res.send(del);
        } catch (error) {
            res.status(400).send(error.message);
        }
}

module.exports = {
    getAllProduct,
    addProduct,
    getProductbyId,
    updateProduct,
    deleteProduct
}