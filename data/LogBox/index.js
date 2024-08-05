'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getLogBox = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LogBox');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(BoxId) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LogBox');
        const event = await pool.request()
                            .input('BoxId', sql.NVarChar(100), BoxId)
                            .query(sqlQueries.getbyid);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getLast = async(BoxId) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LogBox');
        const event = await pool.request()
                            .input('BoxId', sql.NVarChar(100), BoxId)
                            .query(sqlQueries.getlastactivebox);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const createLogBox =async(Box) =>{
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LogBox');
        const insertProduct = await pool.request()
                            .input( 'BoxId', sql.NVarChar(100), Box.BoxId)
                            .input('GetFrom', sql.NVarChar(100), Box.GetFrom)
                            .input('SendTo', sql.NVarChar(100), Box.SendTo)
                            .input('TransType',sql.NVarChar,Box.TransType)
                            .query(sqlQueries.create);                            
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createLogBox,
    getLogBox,
    getById,
    getLast
}