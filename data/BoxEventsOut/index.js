'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProductOut = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxEventsOut');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdOut = async(BoxId) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxEventsOut');
        const event = await pool.request()
                            .input('BoxId', sql.Int, BoxId)
                            .query(sqlQueries.getbyid);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatProductOut = async (Box) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxEventsOut');
        const insertProduct = await pool.request()
                            .input( 'BoxId', sql.Int, Box.BoxId)
                            .input('Vendor', sql.NVarChar(100), Box.Vendor)
                            .input('VendorName', sql.NVarChar(100), Box.VendorName)
                            .input('TranDate', sql.DateTime, Box.TranDate)
                            .query(sqlQueries.create);                            
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}
const updateProductbyIdOut = async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxEventsOut');
        const update = await pool.request()
                        .input('BoxId', sql.Int, BoxId)
                        .input('Vendor', sql.NVarChar(100), data.Vendor)
                        .input('VendorName',sql.NVarChar(100), data.VendorName)
                        .input('TranDate', sql.DateTime, data.TranDate)
                        .query(sqlQueries.updatebox);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getProductOut,
     getByIdOut,
   creatProductOut,
   updateProductbyIdOut
}