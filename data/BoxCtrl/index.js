'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProduct = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
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
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const event = await pool.request()
                            .input('BoxId', sql.NVarChar(100), BoxId)
                            .query(sqlQueries.getbyid);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatProduct = async (Box) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const insertProduct = await pool.request()
                            .input( 'BoxId', sql.NVarChar(100), Box.BoxId)
                            .input('BoxName', sql.NVarChar(100), Box.BoxName)
                            .input('Vendor', sql.NVarChar(100), Box.Vendor)
                            .query(sqlQueries.create);                            
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}
const updateProductbyId = async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const update = await pool.request()
                        .input('BoxId', sql.NVarChar(100), BoxId)
                        .input('Vendor', sql.NVarChar(100), data.Vendor)
                        .input('VendorName',sql.NVarChar(100), data.VendorName)
                        .input('TransDate', sql.DateTime, data.TransDate)
                        .input('TransType',sql.NVarChar ,data.TransType)
                        .query(sqlQueries.updatebox);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}
    const deleteProductbyId = async (BoxId, data) => {
        try {
            sql.close();
            let pool = await sql.connect(config.sql);
            const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
            const dele = await pool.request()
                            .input('BoxId', sql.Int, BoxId)
                            .query(sqlQueries.deletebox);
            return dele.recordset;
        } catch (error) {
            return error.message;
        }
    }


module.exports = {
    getProduct,
     getById,
   creatProduct,
   updateProductbyId,
   deleteProductbyId
}