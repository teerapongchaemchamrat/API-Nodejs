'use strict';
const utils = require('../utils');
const config = require('../../config_weblayout');
const sql = require('mssql');

const getEvents = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Location_controll');
        const getlist = await pool.request().query(sqlQueries.get);
        return getlist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async (values_select) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Location_controll');
        const getbyid = await pool.request()
                            .input('values_select', sql.Int, values_select)
                            .query(sqlQueries.getById);
        return getbyid.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const creatEvent = async (data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Location_controll');
        const insertEvent = await pool.request()
                            .input('values_select', sql.Int, data.values_select)
                            .input('Uf_asset_Location', sql.NVarChar(30), data.Uf_asset_Location)
                            .query(sqlQueries.insert);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (Uf_asset_Location, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Location_controll');
        const updateEvent = await pool.request()
                            .input('Uf_asset_Location', sql.NVarChar(30), Uf_asset_Location)
                            .input('image', sql.NVarChar(100), data.image_location)
                            .query(sqlQueries.update);
        return updateEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (values_select) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Location_controll');
        const deleteEvent = await pool.request()
                            .input('values_select', sql.Int, values_select)
                            .query(sqlQueries.delete);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEvents,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent
}