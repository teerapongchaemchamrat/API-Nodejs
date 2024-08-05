'use strict';
const utils = require('../utils');
const config = require('../../config_cyf');
const sql = require('mssql');



const getPicture = async (item) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('CYF_item_pic');
        const getList = await pool.request()
                                .input('item', sql.NVarChar(100), item)
                                .query(sqlQueries.get);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

// const getJobremain = async (job) => {
//     try {
//         sql.close();
//         let pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('CYF_item_pic');
//         const getList = await pool.request()
//                                 .input('job', sql.NVarChar(100), job)
//                                 .query(sqlQueries.job_remain);
//         return getList.recordset;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

const getJobremain = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('CYF_item_pic');
        const getList = await pool.request()
                                
                                .query(sqlQueries.job_remain);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const gettest = async (item) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('CYF_item_pic');
        const getList = await pool.request()
                                .input('item', sql.NVarChar(100), item)
                                .query(sqlQueries.getpic);
        return getList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getPicture,
    gettest,
    getJobremain
}