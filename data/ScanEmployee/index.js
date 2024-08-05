'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProduct = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const getList = await pool.request().query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getCheck = async (employeeID) => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const getEmployee = await pool.request()
                                    .input('employeeID', sql.NVarChar(50), employeeID)
                                    .query(sqlQueries.getcheck);
        return getEmployee.recordset;
    }catch (error) {
        console.log(error.message);
    }
}

const getTotalDay = async (param_date) => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const gettotal = await pool.request()
                                    .input('param_date', sql.NVarChar(50), param_date)
                                    .query(sqlQueries.totalday);
        return gettotal.recordset;
    }catch (error) {
        console.log(error.message);
    }
}

const getlocationMatch = async (param_date) => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const gettotal = await pool.request()
                                    .input('param_date', sql.NVarChar(50), param_date)
                                    .query(sqlQueries.location_match);
        return gettotal.recordset;
    }catch (error) {
        console.log(error.message);
    }
}

const getlocationNoMatch = async (param_date) => {
    try{
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const gettotal = await pool.request()
                                    .input('param_date', sql.NVarChar(50), param_date)
                                    .query(sqlQueries.location_no_match);
        return gettotal.recordset;
    }catch (error) {
        console.log(error.message);
    }
}

const createChart = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const getList = await pool.request().query(sqlQueries.createchart);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const creatProduct = async (eventdata) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ScanEmployee');
        const insertProduct = await pool.request()
                            .input("employeeID", sql.Int, eventdata.employeeID)
                            .input("employeeName", sql.NVarChar(500), eventdata.employeeName)
                            .input("Department", sql.NVarChar(200), eventdata.Department)
                            .input("Location", sql.NVarChar(500), eventdata.Location)
                            .query(sqlQueries.create);
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getProduct,
    createChart,
    creatProduct,
    getCheck,
    getTotalDay,
    getlocationMatch,
    getlocationNoMatch
}