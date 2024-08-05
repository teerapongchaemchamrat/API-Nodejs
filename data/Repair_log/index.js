'use strict';
const utils = require('../utils');
const config = require('../../config_weblayout');
const sql = require('mssql');

const getEvents = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Repair_log');
        const getlist = await pool.request().query(sqlQueries.getall);
        return getlist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(Uf_asset_RESID) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Repair_log');
        const getbyid = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                            .query(sqlQueries.getById);
        return getbyid.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByIdLast = async(Uf_asset_RESID) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Repair_log');
        const getbyid = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                            .query(sqlQueries.getlast);
        return getbyid.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEvent = async (data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Repair_log');
        const insertEvent = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), data.Uf_asset_RESID)
                            .input('Part_no', sql.NVarChar(30), data.Part_no)
                            .input('Part_name', sql.NVarChar(100), data.Part_name)
                            .input('Quantity', sql.Int, data.Quantity)
                            .input('Note', sql.NVarChar(200), data.Note)
                            .input('Type', sql.NVarChar(50), data.Type)
                            .input('update_by', sql.NVarChar(20), data.update_by)
                            .query(sqlQueries.create);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (Uf_asset_RESID, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Repair_log');
        const update = await pool.request()
                        .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                        .input('Part_no', sql.NVarChar(30), data.Part_no)
                        .input('Part_name', sql.NVarChar(100), data.Part_name)
                        .input('Quantity', sql.Int, data.Quantity)
                        .query(sqlQueries.update);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEvents,
    getById,
    getByIdLast,
    creatEvent,
    updateEvent
}