'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getTransBox = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TransBox');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const updateTranboxbyId= async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('BoxCtrl');
        const update = await pool.request()
                        .input('BoxId', sql.Int, BoxId)
                        .input('Vendor', sql.NVarChar(100), data.Vendor)
                        .input('VendorName',sql.NVarChar(100), data.VendorName)
                        .query(sqlQueries.updatebox);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteTransBoxbyId = async (BoxId, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TransBox');
        const dele = await pool.request()
                        .input('BoxId', sql.Int, BoxId)
                        .query(sqlQueries.updatebox);
        return dele.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports={

    getTransBox,
    deleteTransBoxbyId,
    updateTranboxbyId

}