'use strict';
const utils = require('../utils');
const config = require('../../config_weblayout');
const sql = require('mssql');

const getEvents = async () => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('resource');
        const getlist = await pool.request().query(sqlQueries.get);
        return getlist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(Uf_asset_RESID) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('resource');
        const getbyid = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                            .query(sqlQueries.getById);
        return getbyid.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEvent = async (data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('resource');
        const insertEvent = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), data.Uf_asset_RESID)
                            // .input('Uf_asset_Car_Exp', sql.DateTime, data.Uf_asset_Car_Exp ? new Date(data.Uf_asset_Car_Exp) : null)
                            // .input('Uf_asset_Compulsory_Exp', sql.DateTime, data.Uf_asset_Compulsory_Exp ? new Date(data.Uf_asset_Compulsory_Exp) : null)
                            .input('Uf_asset_Contact', sql.NVarChar(200), data.Uf_asset_Contact)
                            .input('Uf_asset_ErectricCurrent', sql.NVarChar(3), data.Uf_asset_ErectricCurrent)
                            .input('Uf_asset_Location', sql.NVarChar(30), data.Uf_asset_Location)
                            .input('Uf_asset_ModelNumber', sql.NVarChar(20), data.Uf_asset_ModelNumber)
                            .input('Uf_asset_PmDurationTime', sql.Int, data.Uf_asset_PmDurationTime)
                            .input('Uf_asset_PmLink', sql.NVarChar(100), data.Uf_asset_PmLink)
                            .input('Uf_asset_SerialNumber', sql.NVarChar(30), data.Uf_asset_SerialNumber)
                            // .input('Uf_asset_StartUsedDate', sql.DateTime, data.Uf_asset_StartUsedDate)
                            // .input('Uf_asset_StartUsedDate', sql.DateTime, new Date(data.Uf_asset_StartUsedDate))
                            .input('Uf_asset_StartUsedDate', sql.DateTime, data.Uf_asset_StartUsedDate ? new Date(data.Uf_asset_StartUsedDate) : null)
                            .input('Uf_asset_UserManual', sql.NVarChar(100), data.Uf_asset_UserManual)
                            .input('Uf_asset_Voltage', sql.NVarChar(20), data.Uf_asset_Voltage)
                            .input('Uf_asset_Weight', sql.Decimal(10,2), data.Uf_asset_Weight)
                            .input('Uf_asset_ErectricKw', sql.NVarChar(10), data.Uf_asset_ErectricKw)
                            // .input('Uf_asset_ExpireDate', sql.DateTime, data.Uf_asset_ExpireDate)
                            // .input('Uf_asset_ExpireDate', sql.DateTime, new Date(data.Uf_asset_ExpireDate))
                            .input('Uf_asset_ExpireDate', sql.DateTime, data.Uf_asset_ExpireDate ? new Date(data.Uf_asset_ExpireDate) : null)
                            .input('Uf_asset_department', sql.NVarChar(100), data.Uf_asset_department)
                            .input('Uf_asset_inventory_number', sql.NVarChar(50), data.Uf_asset_inventory_number)
                            .input('create_by', sql.NVarChar(20), data.create_by)
                            .input('values_select', sql.Int, data.values_select)
                            .query(sqlQueries.create);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (Uf_asset_RESID, data) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('resource');
        const update = await pool.request()
                        .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                        .input('Uf_asset_RESID_update', sql.NVarChar(30), data.Uf_asset_RESID_update)
                        // .input('Uf_asset_Car_Exp', sql.DateTime, data.Uf_asset_Car_Exp)
                        //.input('Uf_asset_Car_Exp', sql.DateTime, data.Uf_asset_Car_Exp ? new Date(data.Uf_asset_Car_Exp) : null)
                        // .input('Uf_asset_Compulsory_Exp', sql.DateTime, data.Uf_asset_Compulsory_Exp)
                        //.input('Uf_asset_Compulsory_Exp', sql.DateTime, data.Uf_asset_Compulsory_Exp ? new Date(data.Uf_asset_Compulsory_Exp) : null)
                        .input('Uf_asset_Contact', sql.NVarChar(200), data.Uf_asset_Contact)
                        .input('Uf_asset_ErectricCurrent', sql.NVarChar(3), data.Uf_asset_ErectricCurrent)
                        .input('Uf_asset_Location', sql.NVarChar(30), data.Uf_asset_Location)
                        .input('Uf_asset_ModelNumber', sql.NVarChar(20), data.Uf_asset_ModelNumber)
                        .input('Uf_asset_PmDurationTime', sql.Int, data.Uf_asset_PmDurationTime)
                        .input('Uf_asset_PmLink', sql.NVarChar(100), data.Uf_asset_PmLink)
                        .input('Uf_asset_SerialNumber', sql.NVarChar(30), data.Uf_asset_SerialNumber)
                        // .input('Uf_asset_StartUsedDate', sql.DateTime, data.Uf_asset_StartUsedDate)
                        .input('Uf_asset_StartUsedDate', sql.DateTime, data.Uf_asset_StartUsedDate ? new Date(data.Uf_asset_StartUsedDate) : null)
                        .input('Uf_asset_UserManual', sql.NVarChar(100), data.Uf_asset_UserManual)
                        .input('Uf_asset_Voltage', sql.NVarChar(20), data.Uf_asset_Voltage)
                        .input('Uf_asset_Weight', sql.Decimal(10,2), data.Uf_asset_Weight)
                        .input('Uf_asset_ErectricKw', sql.NVarChar(10), data.Uf_asset_ErectricKw)
                        // .input('Uf_asset_ExpireDate', sql.DateTime, data.Uf_asset_ExpireDate)
                        .input('Uf_asset_ExpireDate', sql.DateTime, data.Uf_asset_ExpireDate ? new Date(data.Uf_asset_ExpireDate) : null)
                        .input('Uf_asset_department', sql.NVarChar(100), data.Uf_asset_department)
                        .input('Uf_asset_inventory_number', sql.NVarChar(50), data.Uf_asset_inventory_number)
                        .input('update_by', sql.NVarChar(20), data.update_by) 
                        .query(sqlQueries.update);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (Uf_asset_RESID) => {
    try {
        sql.close();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('resource');
        const deleteEvent = await pool.request()
                            .input('Uf_asset_RESID', sql.NVarChar(30), Uf_asset_RESID)
                            .query(sqlQueries.delete);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEvents,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent
}