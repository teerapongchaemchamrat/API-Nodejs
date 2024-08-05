'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config() 

const {PORT, HOST , HOST_URL} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT ==='true';

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: "192.168.10.114",
        database: "Webapp",
        user: "sa",
        password: "Cyf027065055",
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true 
        }
    } 
};