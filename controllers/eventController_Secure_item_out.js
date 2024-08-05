'use strict';

const eventData = require('../data/Security_itemout');

const GetPreviewDoc = async (req, res, next) => {
    try {
        const eventlist = await eventData.getPreviewDoc();
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const GetDocID = async (req, res, next) => {
    try {
        const doc = req.params.doc;
        const eventlist = await eventData.getDocId(doc);
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const GetDocFromDate = async (req, res, next) => {
    try {
        const data = req.params.date;
        const eventlist = await eventData.getDocfromdate(data);
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const InsertDataDoc = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.insertDataDoc(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    GetPreviewDoc,
    InsertDataDoc,
    GetDocFromDate,
    GetDocID
};