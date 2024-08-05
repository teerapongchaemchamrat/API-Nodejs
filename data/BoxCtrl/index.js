'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProductIn = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdIn = async(BoxId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const event = await pool.request()
                            .input('BoxId', sql.Int, BoxId)
                            .query(sqlQueries.getbyid);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatProductIn = async (Box) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const insertProduct = await pool.request()
                            .input( 'BoxId', sql.Int, Box.BoxId)
                            .input('Vendor', sql.NVarChar(100), Box.Vendor)
                            .input('VendorName', sql.NVarChar(100), Box.VendorName)
                            .input('TranDate', sql.DateTime, Box.TranDate)
                            .input('TranType',sql.Bit,data.TranType)
                            .query(sqlQueries.create);                            
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}
const updateProductbyIdIn = async (BoxId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const update = await pool.request()
                        .input('BoxId', sql.Int, BoxId)
                        .input('Vendor', sql.NVarChar(100), data.Vendor)
                        .input('VendorName',sql.NVarChar(100), data.VendorName)
                        .input('TranDate', sql.DateTime, data.TranDate)
                        .input('TranType',sql.Bit,data.TranType)
                        .query(sqlQueries.updatebox);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getProductIn,
     getByIdIn,
   creatProductIn,
   updateProductbyIdIn
}