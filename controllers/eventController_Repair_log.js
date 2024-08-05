'use strict';

const eventData = require('../data/Repair_log');

const getAllEvents = async (req, res ,next) => {
    try{
        const eventlist = await eventData.getEvents();
        res.send(eventlist);
    }catch (error){
        res.status(400).send(error.message);
    }
}

const getID = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const event = await eventData.getById(eventId);
        res.send(event);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getIDLast = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const event = await eventData.getByIdLast(eventId);
        res.send(event);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addEvent = async (req, res, next) => {
    try{
        const data = req.body;
        const insert = await eventData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEvent = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const data = req.body;
        const event = await eventData.updateEvent(eventId, data);
        res.send(event);
    } catch (error) {   
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEvents,
    getID,
    getIDLast,
    addEvent,
    updateEvent
}