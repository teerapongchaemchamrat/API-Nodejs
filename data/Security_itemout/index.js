'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getPreviewDoc = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Security_itemout');
        const getList = await pool.request().query(sqlQueries.preview_docnum);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
};

const getDocId = async (doc_num) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Security_itemout');
        const getList = await pool.request()
                            .input("doc_num", sql.NVarChar(100), doc_num)
                            .query(sqlQueries.getByDoc);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
};

const getDocfromdate = async (datetime_out) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Security_itemout');
        const getList = await pool.request()
                            .input("date", sql.NVarChar(100), datetime_out)
                            .query(sqlQueries.getfromdate);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
};

const insertDataDoc = async (data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Security_itemout');
        const insertData = await pool.request()
                            .input("cyf_dpt", sql.NVarChar(100), data.cyf_dpt)
                            .input("name_out", sql.NVarChar(100), data.name_out)
                            .input("company", sql.NVarChar(100), data.company)
                            .input("datetime_out", sql.NVarChar(100), data.datetime_out)
                            .input("job_qty", sql.NVarChar(500), data.job_qty)
                            .input("container_qty", sql.NVarChar(500), data.container_qty)
                            .input("container_um", sql.NVarChar(500), data.container_um)
                            .input("tool_qty", sql.NVarChar(500), data.tool_qty)
                            .input("computer_qty", sql.NVarChar(500), data.computer_qty)
                            .input("measuringtools_qty", sql.NVarChar(500), data.measuringtools_qty)
                            .input("etc", sql.NVarChar(500), data.etc)
                            .input("purpose", sql.NVarChar(500), data.purpose)
                            .input("car_type", sql.NVarChar(500), data.car_type)
                            .input("car_reg", sql.NVarChar(500), data.car_reg)
                            .input("cyf_approve", sql.NVarChar(500), data.cyf_approve)
                            .query(sqlQueries.insert);                            
        return insertData.recordset;
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    getPreviewDoc,
    insertDataDoc,
    getDocfromdate,
    getDocId
};