'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const sql = require('mssql');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const eventControll = require('../controllers/eventController_Delivery');

router.use(cors());

router.get('/get/photo', eventControll.GetAll);
router.get('/get/photo/:co/:date', eventControll.GetById);

router.use(express.static('public'))
router.get('/web',function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.sendFile(path.resolve(__dirname,'D:/Application_API/Delivery.html'))
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'DeliveryF1'); // Specify the destination directory for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'D:/Web-delivery/build/ImageF1'); // Specify the destination directory for uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   }
// });

  const upload = multer({ storage: storage });
  
  const config = {
    server: '192.168.10.114',
    database: 'Application',
    user: 'sa',
    password: 'Cyf027065055',
    options: {
      trustedConnection: true,
      enableArithAbort: true,
      useUTC: true,
      driver: 'msnodesqlv8',
      encrypt: false,
    },
  };

  router.post('/uploads', upload.fields([{ name: 'file1', maxCount: 1 },{ name: 'file2', maxCount: 1 },{ name: 'file3', maxCount: 1 }]), async (req, res) => {
    sql.close();
    try {
      const { Co, Line, Linesub, Qty } = req.body;
      const files = req.files;
  
      if (!Co || !Line || !Linesub || !files.file1 ) {
        return res.status(400).json({ error: 'Missing data or files.' });
      }
  
      const baseUploadDir = path.join("D:/Application_API", 'DeliveryF1'); // Assuming 'uploads' is your base directory
      //const baseUploadDir = path.join("D:/Web-delivery/build", 'ImageF1'); // Assuming 'uploads' is your base directory
      const dateFolder = new Date().toISOString().slice(0, 10);
      const coFolder = path.join(baseUploadDir, dateFolder, Co);
      const lineFolder = path.join(coFolder, Line);
      const linesubFolder = path.join(lineFolder, Linesub);
  
      // Create directories if they don't exist
      try {
              if (!fs.existsSync(coFolder)) {
                await fs.promises.mkdir(coFolder, { recursive: true });
                console.log(`Created directory: ${coFolder}`);
              }
        
              if (!fs.existsSync(lineFolder)) {
                await fs.promises.mkdir(lineFolder, { recursive: true });
                console.log(`Created directory: ${lineFolder}`);
              }
        
              if (!fs.existsSync(linesubFolder)) {
                await fs.promises.mkdir(linesubFolder, { recursive: true });
                console.log(`Created directory: ${linesubFolder}`);
              }
            } catch (err) {
              console.error('Error creating folders:', err);
              return cb(err);
            }
  
      const filePaths = [];
  
      for (const fieldname in files) {
        const file = files[fieldname][0];
        const newFilePath = path.join(linesubFolder, file.originalname);
  
        await promisify(fs.rename)(file.path, newFilePath);
        filePaths.push(newFilePath);
      }
  
      const pool = await sql.connect(config);
          const request = pool.request();
  
          request.input('Co', sql.NVarChar, Co);
          request.input('Line', sql.NVarChar, Line);
          request.input('Linesub', sql.NVarChar, Linesub);
          request.input('Qty', sql.Int, Qty);
  
          request.input('Image1', sql.NVarChar, filePaths[0]);
          request.input('Image2', sql.NVarChar, filePaths[1]);
          request.input('Image3', sql.NVarChar, filePaths[2]);
  
          const query = `
              INSERT INTO App_Delivery (Co, Line, Linesub, Qty, Image1, Image2, Image3)
              VALUES (@Co, @Line, @Linesub, @Qty, @Image1, @Image2, @Image3)
          `;
  
          await request.query(query);
  
          await pool.close();
  
          res.sendStatus(200);
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  router.get('/get/photo/or', async (req, res) => {
    sql.close(); 
    try {
        // Connect to the SQL Server
        await sql.connect(config);
    
        // Define SQL query parameters
        const co = req.query.co;
        const date = req.query.date;
    
        // Execute the SQL query
        const result = await sql.query`
          SELECT 
            [App_Delivery].[Co],
            [App_Delivery].[Line],
            [coitem].[item],
            [App_Delivery].[Linesub],
            [App_Delivery].[Qty],
            [App_Delivery].[image1],
            [App_Delivery].[image2],
            [App_Delivery].[image3],
            [App_Delivery].[Date]
          FROM [dbo].[App_Delivery]
          INNER JOIN Link_CYf_SERVER_03.[CYF_LIV_App].[dbo].[coitem]
          ON [App_Delivery].[Co] COLLATE Thai_CI_AS = [coitem].[co_num] 
          WHERE (Co = ${co} OR CONVERT(date, [Date]) = ${date})
        `;
    
        // Send the result as JSON
        res.json(result.recordset);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } finally {
        // Close the SQL connection
        sql.close();
      }
    });

 
module.exports = {
    routes: router
}