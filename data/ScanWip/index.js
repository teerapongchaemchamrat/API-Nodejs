'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const createWip = async (eventdata) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanWip');
        const insertWip = await pool.request()
                            .input("Job", sql.NVarChar(100), eventdata.Job)
                            .input("Item", sql.NVarChar(100), eventdata.Item)
                            .input("Quantity", sql.Int, eventdata.Quantity)
                            .input("Recipient", sql.NVarChar(100), eventdata.Recipient)
                            .input("Picture", sql.NVarChar(500), eventdata.Picture)
                            .query(sqlQueries.create);                            
        return insertWip.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createWip
}