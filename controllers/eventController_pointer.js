'use strict';

const eventData = require('../data/pointer');

const getAllEvents = async (req, res, next) => {
    try {
        const eventlist = await eventData.getEvents();
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLoaction1 = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await eventData.getlocation1(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await eventData.getById(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatEvent = async (req, res, next) => {
    try {
        const eventId =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateEvent(eventId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStat = async (req, res, next) => {
    try {
        const eventStat = req.params.id;
        const data = req.body;
        const updated = await eventData.updateStat(eventStat, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePointer = async (req, res, next) => {
    try {
        const eventPointer = req.params.id;
        const data = req.body;
        const updated = await eventData.updatePointer(eventPointer, data);
        //res.send(updated);
        res.send("Update pointer sucessfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await eventData.deleteEvent(eventId);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const sendEmailById = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await eventData.sendEmail(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updatEvent,
    updateStat,
    updatePointer,
    deleteEvent,
    getLoaction1,
    sendEmailById
}