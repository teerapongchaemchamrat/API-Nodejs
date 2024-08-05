'use strict';

const express = require('express');
const multer = require('multer');
const eventControll = require('../controllers/eventController_ScanWip');
const eventControll_getpicture = require('../controllers/eventController_itemPic');
const eventControll_gettest = require('../controllers/eventController_itemPic');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const sql = require('mssql');

router.post('/add', eventControll.addWip);
router.get('/get/picture/:id',eventControll_getpicture.getAllPicture)
router.get("/get/:id",eventControll_gettest.getPicTest);
router.get("/job", eventControll_getpicture.getJobRemain);

// SQL Server configuration
const config = {
    server: '192.168.10.114',
    database: 'App_PUR',
    user: 'sa',
    password: 'Cyf027065055',
    options: {
      encrypt: false, // For secure connection
      trustServerCertificate: true,
    },
  };

  // API route for uploading pictures
  router.post('/upload', upload.single('file'), (req, res) => {
    // Get the uploaded file details
    const { originalname, mimetype, filename, path } = req.file;
    const { job, item, quantity, recipient } = req.body;
  
    // Read the file content as binary data
    const fileContent = require('fs').readFileSync(path);
  
    // Connect to SQL Server
    sql.close();
    sql.connect(config, (err) => {
      if (err) {
        console.error('Failed to connect to SQL Server:', err);
        res.sendStatus(500);
        return;
      }
  
      // Create a new SQL Server connection pool
      const pool = new sql.ConnectionPool(config);
  
      // Use the connection pool to query the database
      pool.connect().then((pool) => {
        // Prepare the SQL statement
        // const query = `INSERT INTO [dbo].[WIP_Scan] ([Job], [Item], [Quantity], [Recipient], [Camera]) 
        //                VALUES (@Job, @Item, @Quantity, @Recipient, @Camera)`;

        const query = `INSERT INTO [dbo].[Scan_WIP] ([Job], [Item], [Quantity], [Recipient], [Camera], [Picture])
        SELECT @Job, @Item, @Quantity, @Recipient, @Camera, [picture]
        FROM Link_CYf_SERVER_03.[CYF_LIV_App].[dbo].[item]
        WHERE item = @item;`;
  
        // Create a new SQL Server request
        const request = new sql.Request(pool);
  
        // Bind the parameters
        request.input('Job', sql.NVarChar, job);
        request.input('Item', sql.NVarChar, item);
        request.input('Quantity', sql.Int, quantity);
        request.input('Recipient', sql.NVarChar, recipient);
        request.input('Camera', sql.VarBinary(sql.MAX), fileContent);
  
        // Execute the query
        request.query(query).then(() => {
          // Close the connection pool
          pool.close();
  
          // Send a success response
          res.sendStatus(200);
        }).catch((err) => {
          console.error('Failed to execute SQL query:', err);
          res.sendStatus(500);
          pool.close();
        });
      }).catch((err) => {
        console.error('Failed to connect to SQL Server:', err);
        res.sendStatus(500);
      });
    });
  });

  router.post('/f2/upload', upload.single('file'), (req, res) => {
    // Get the uploaded file details
    const { originalname, mimetype, filename, path } = req.file;
    const { job, item, quantity, recipient } = req.body;
  
    // Read the file content as binary data
    const fileContent = require('fs').readFileSync(path);
  
    // Connect to SQL Server
    sql.close();
    sql.connect(config, (err) => {
      if (err) {
        console.error('Failed to connect to SQL Server:', err);
        res.sendStatus(500);
        return;
      }
  
      // Create a new SQL Server connection pool
      const pool = new sql.ConnectionPool(config);
  
      // Use the connection pool to query the database
      pool.connect().then((pool) => {
        // Prepare the SQL statement
        // const query = `INSERT INTO [dbo].[WIP_Scan] ([Job], [Item], [Quantity], [Recipient], [Camera]) 
        //                VALUES (@Job, @Item, @Quantity, @Recipient, @Camera)`;

        const query = `INSERT INTO [dbo].[Scan_WIP_F2] ([Job], [Item], [Quantity], [Recipient], [Camera], [Picture])
        SELECT @Job, @Item, @Quantity, @Recipient, @Camera, [picture]
        FROM Link_CYf_SERVER_03.[CYF_LIV_App].[dbo].[item]
        WHERE item = @item;`;
  
        // Create a new SQL Server request
        const request = new sql.Request(pool);
  
        // Bind the parameters
        request.input('Job', sql.NVarChar, job);
        request.input('Item', sql.NVarChar, item);
        request.input('Quantity', sql.Int, quantity);
        request.input('Recipient', sql.NVarChar, recipient);
        request.input('Camera', sql.VarBinary(sql.MAX), fileContent);
  
        // Execute the query
        request.query(query).then(() => {
          // Close the connection pool
          pool.close();
  
          // Send a success response
          res.sendStatus(200);
        }).catch((err) => {
          console.error('Failed to execute SQL query:', err);
          res.sendStatus(500);
          pool.close();
        });
      }).catch((err) => {
        console.error('Failed to connect to SQL Server:', err);
        res.sendStatus(500);
      });
    });
  });

module.exports = {
    routes: router
}