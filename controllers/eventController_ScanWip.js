'use strict';

const eventData = require('../data/ScanWip');

const addWip = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.createWip(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    addWip
}