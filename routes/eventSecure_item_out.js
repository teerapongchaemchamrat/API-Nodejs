'use strict';
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const sql = require('mssql');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const eventControll_Security = require('../controllers/eventController_Secure_item_out');

router.use(cors());

router.get('/doc/preview', eventControll_Security.GetPreviewDoc);
router.get('/doc/:date', eventControll_Security.GetDocFromDate);
router.get('/doc/id/:doc', eventControll_Security.GetDocID);
router.post('/doc/add', eventControll_Security.InsertDataDoc);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/Web-secure-item-out/build/image/photo'); // Specify the destination directory for uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    }
  });

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

router.post('/doc/uploads', upload.fields([{ name: 'file1', maxCount: 1 },{ name: 'file2', maxCount: 1 },{ name: 'file3', maxCount: 1 },{ name: 'file4', maxCount: 1 },{ name: 'file5', maxCount: 1 }]), async (req, res) => {
    sql.close();
    try {
      const { doc_num } = req.body;
      const files = req.files;
  
      if (!doc_num || !files.file1 || !files.file2 || !files.file3 ) {
        return res.status(400).json({ error: 'Missing data or files.' });
      }
  
      const baseUploadDir = path.join('D:/Web-secure-item-out/build/image', 'photo'); // Assuming 'uploads' is your base directory
      const docFolder = path.join(baseUploadDir, doc_num);
     
      // Create directories if they don't exist
      try {
              if (!fs.existsSync(docFolder)) {
                await fs.promises.mkdir(docFolder, { recursive: true });
                console.log(`Created directory: ${docFolder}`);
              }
        
            } catch (err) {
              console.error('Error creating folders:', err);
              return cb(err);
            }
  
      const filePaths = [];
  
      for (const fieldname in files) {
        const file = files[fieldname][0];
        const newFilePath = path.join(docFolder, file.originalname);
  
        await promisify(fs.rename)(file.path, newFilePath);
        filePaths.push(newFilePath);
      }
  
      const pool = await sql.connect(config);
          const request = pool.request();
  
          request.input('doc_num', sql.NVarChar, doc_num);
  
          request.input('Image1', sql.NVarChar, filePaths[0]);
          request.input('Image2', sql.NVarChar, filePaths[1]);
          request.input('Image3', sql.NVarChar, filePaths[2]);
          request.input('Image4', sql.NVarChar, filePaths[3]);
          request.input('Image5', sql.NVarChar, filePaths[4]);
  
          const query = `
              UPDATE [dbo].[Security_item_out] 
              SET   image1 = @Image1,
                    image2 = @Image2,
                    image3 = @Image3,
                    image4 = @Image4,
                    image5 = @Image5
              WHERE doc_num = @doc_num
          `;
  
          await request.query(query);
  
          await pool.close();
  
          res.sendStatus(200);
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

router.post('/doc/upload/draw1', upload.single('file1'), async (req, res) => {
  sql.close();
  try {
    const { doc_num } = req.body;
    const file = req.file;

    if (!doc_num || !file) {
      return res.status(400).json({ error: 'Missing data or file.' });
    }

    const baseUploadDir = path.join('D:/Web-secure-item-out/build/image', 'photo'); // Assuming 'uploads' is your base directory
    const docFolder = path.join(baseUploadDir, doc_num);

    // Create directories if they don't exist
    try {
      if (!fs.existsSync(docFolder)) {
        await fs.promises.mkdir(docFolder, { recursive: true });
        console.log(`Created directory: ${docFolder}`);
      }
    } catch (err) {
      console.error('Error creating folders:', err);
      return res.status(500).json({ error: 'Error creating folders.' });
    }

    const newFilePath = path.join(docFolder, file.originalname);

    await fs.promises.rename(file.path, newFilePath);

    const pool = await sql.connect(config);
    const request = pool.request();

    request.input('doc_num', sql.NVarChar, doc_num);
    request.input('Draw1', sql.NVarChar, newFilePath);

    const query = `
      UPDATE [dbo].[Security_item_out] 
      SET draw1 = @Draw1
      WHERE doc_num = @doc_num
    `;

    await request.query(query);

    await pool.close();

    res.sendStatus(200);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/doc/upload/draw2', upload.single('file1'), async (req, res) => {
  sql.close();
  try {
    const { doc_num } = req.body;
    const file = req.file;

    if (!doc_num || !file) {
      return res.status(400).json({ error: 'Missing data or file.' });
    }

    const baseUploadDir = path.join('D:/Web-secure-item-out/build/image', 'photo'); // Assuming 'uploads' is your base directory
    const docFolder = path.join(baseUploadDir, doc_num);

    // Create directories if they don't exist
    try {
      if (!fs.existsSync(docFolder)) {
        await fs.promises.mkdir(docFolder, { recursive: true });
        console.log(`Created directory: ${docFolder}`);
      }
    } catch (err) {
      console.error('Error creating folders:', err);
      return res.status(500).json({ error: 'Error creating folders.' });
    }

    const newFilePath = path.join(docFolder, file.originalname);

    await fs.promises.rename(file.path, newFilePath);

    const pool = await sql.connect(config);
    const request = pool.request();

    request.input('doc_num', sql.NVarChar, doc_num);
    request.input('Draw2', sql.NVarChar, newFilePath);

    const query = `
      UPDATE [dbo].[Security_item_out] 
      SET draw2 = @Draw2
      WHERE doc_num = @doc_num
    `;

    await request.query(query);

    await pool.close();

    res.sendStatus(200);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/doc/upload/draw3', upload.single('file1'), async (req, res) => {
  sql.close();
  try {
    const { doc_num } = req.body;
    const file = req.file;

    if (!doc_num || !file) {
      return res.status(400).json({ error: 'Missing data or file.' });
    }

    const baseUploadDir = path.join('D:/Web-secure-item-out/build/image', 'photo'); // Assuming 'uploads' is your base directory
    const docFolder = path.join(baseUploadDir, doc_num);

    // Create directories if they don't exist
    try {
      if (!fs.existsSync(docFolder)) {
        await fs.promises.mkdir(docFolder, { recursive: true });
        console.log(`Created directory: ${docFolder}`);
      }
    } catch (err) {
      console.error('Error creating folders:', err);
      return res.status(500).json({ error: 'Error creating folders.' });
    }

    const newFilePath = path.join(docFolder, file.originalname);

    await fs.promises.rename(file.path, newFilePath);

    const pool = await sql.connect(config);
    const request = pool.request();

    request.input('doc_num', sql.NVarChar, doc_num);
    request.input('Draw3', sql.NVarChar, newFilePath);

    const query = `
      UPDATE [dbo].[Security_item_out] 
      SET draw3 = @Draw3
      WHERE doc_num = @doc_num
    `;

    await request.query(query);

    await pool.close();

    res.sendStatus(200);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = {
    routes: router
}