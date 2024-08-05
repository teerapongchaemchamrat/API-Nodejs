'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAll = async () => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Delivery');
        const getList = await pool.request().query(sqlQueries.getall);
        return getList.recordset;
    }catch (error) {
        return error.message;
    }
}

const getById = async(co, date) => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Delivery');
        const event = await pool.request()
                            .input('co', sql.NVarChar(20), co)
                            .input('date', sql.Date, date)
                            .query(sqlQueries.getById);
        return event.recordset;
    }catch (error) {
        return error.message;
    }
}

module.exports = {
    getAll,
    getById
}