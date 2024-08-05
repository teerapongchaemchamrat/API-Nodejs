'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getVendor = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Vendor');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const createVendor =async(Box) =>{
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Vendor');
        const insertProduct = await pool.request()
                            .input('Vendor', sql.NVarChar(100), Box.Vendor)
                            .input('VendorName', sql.NVarChar(100), Box.VendorName)  
                            .query(sqlQueries.create);                         
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateVendorbyId= async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Vendor');
        const update = await pool.request()
                        .input('BoxId', sql.NVarChar(100), BoxId)
                        .input('Vendor', sql.NVarChar(100), data.Vendor)
                        .input('GetFrom', sql.NVarChar(100),data.GetFrom)
                        .input('SendTo', sql.NVarChar(100),data.SendTo)
                        .input('TransDate', sql.DateTime, data.TransDate)
                        .input('TransType',sql.NVarChar,data.TransType)
                        .query(sqlQueries.updatebox);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteVendorbyId = async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Vendor');
        const dele = await pool.request()
                        .input('BoxId', sql.Int, BoxId)
                        .query(sqlQueries.deletebox);
        return dele.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports={
    getVendor,
    deleteVendorbyId,
    updateVendorbyId,
    createVendor
}