'use strict';
const utils = require('../utils');
const config = require('../../config_weblayout');
const sql = require('mssql');

const getEvents = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Department');
        const getlist = await pool.request().query(sqlQueries.get);
        return getlist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(dept) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Department');
        const getbyid = await pool.request()
                            .input('dept', sql.NVarChar(30), dept)
                            .query(sqlQueries.getById);
        return getbyid.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (dept, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Department');
        const update = await pool.request()
                        .input('dept', sql.NVarChar, dept)
                        .input('dept_new', sql.NVarChar, data.dept_new)
                        .query(sqlQueries.update);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (dept) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Department');
        const deleteEvent = await pool.request()
                            .input('dept', sql.NVarChar, dept)
                            .query(sqlQueries.delete);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEvents,
    getById,
    updateEvent,
    deleteEvent
}