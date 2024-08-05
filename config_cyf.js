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
        server: "XXXXXXXXXXX",
        database: "CYF_LIV_APP",
        user: "sa",
        password: "XXXXXXXX",
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true 
        }
    } 
};
