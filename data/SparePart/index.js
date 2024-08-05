'use strict';
const utils = require('../utils');
const config = require('../../config_weblayout');
const sql = require('mssql');

const getEvents = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const getlist = await pool.request().query(sqlQueries.get);
        return getlist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(Part_no) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const getbyid = await pool.request()
                            .input('Part_no', sql.NVarChar(30), Part_no)
                            .query(sqlQueries.getById);
        return getbyid.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEvent = async (data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const insertEvent = await pool.request()
                            .input('Part_no', sql.NVarChar(30), data.Part_no)
                            .input('Part_name', sql.NVarChar(100), data.Part_name)
                            .input('Quantity', sql.Int, data.Quantity)
                            .query(sqlQueries.create);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const update_add_stock = async (Part_no, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const update = await pool.request()
                        .input('Part_no', sql.NVarChar(30), Part_no)
                        .input('Add_Quantity', sql.Int, data.Add_Quantity)
                        .query(sqlQueries.update_add_stock);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const update_minus_stock = async (Part_no, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const update = await pool.request()
                        .input('Part_no', sql.NVarChar(30), Part_no)
                        .input('Minus_Quantity', sql.Int, data.Minus_Quantity)
                        .query(sqlQueries.update_minus_stock);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (Part_no) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('SparePart');
        const deleteEvent = await pool.request()
                            .input('Part_no', sql.NVarChar(30), Part_no)
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
    update_add_stock,
    update_minus_stock,
    deleteEvent
}