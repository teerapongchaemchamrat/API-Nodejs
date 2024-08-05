'use strict';

const eventData = require('../data/SparePart');

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

const addEvent = async (req, res, next) => {
    try{
        const data = req.body;
        const insert = await eventData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_add_stock = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const data = req.body;
        const event = await eventData.update_add_stock(eventId, data);
        res.send(event);
    } catch (error) {   
        res.status(400).send(error.message);
    }
}

const update_minus_stock = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const data = req.body;
        const event = await eventData.update_minus_stock(eventId, data);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const event = await eventData.deleteEvent(eventId);
        res.send(event);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEvents,
    getID,
    addEvent,
    update_add_stock,
    update_minus_stock,
    deleteEvent
}