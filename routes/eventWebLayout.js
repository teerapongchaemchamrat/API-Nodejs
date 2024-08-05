'use strict';
const express = require('express');
const eventControll = require('../controllers/eventController_pointer');
const eventControll_resource = require('../controllers/eventController_resource');
const eventControll_Department = require('../controllers/eventController_Department');
const eventControll_SparePart = require('../controllers/eventController_SparePart');
const eventControll_Repair_log = require('../controllers/eventController_Repair_log');
const eventControll_Location_controll = require('../controllers/eventController_Location_controll');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const config = require('../config_weblayout');
const sql = require('mssql');
const bodyParser = require('body-parser');

router.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/WebLayout-react/public/image");
    cb(null, "D:/WebLayout-react/build/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  storage: fileStorageEngine
});

router.get('/pointer/all', eventControll.getAllEvents);
router.get('/pointer/location/:id', eventControll.getLoaction1);
router.get('/pointer/:id', eventControll.getEvent);
router.get('/pointer/email/:id', eventControll.sendEmailById);
router.post('/pointer/add', eventControll.addEvent);
router.put('/pointer/:id', eventControll.updatePointer);
router.put('/pointer/stat/:id', eventControll.updateStat);
router.delete('/pointer/:id', eventControll.deleteEvent);

router.get('/resource/all', eventControll_resource.getAllEvents);
router.get('/resource/:id', eventControll_resource.getEvent);
router.post('/resource/add', eventControll_resource.addEvent);
router.put('/resource/:id', eventControll_resource.updatEvent);
router.delete('/resource/:id', eventControll_resource.deleteEvent);

router.get('/department/all', eventControll_Department.getAllEvents);
router.get('/department/:id', eventControll_Department.getEvent);
router.put('/department/:id', eventControll_Department.updatEvent);
router.delete('/department/:id', eventControll_Department.deleteEvent);

router.get('/sparepart/all', eventControll_SparePart.getAllEvents);
router.get('/sparepart/:id', eventControll_SparePart.getID);
router.post('/sparepart/add', eventControll_SparePart.addEvent);
router.put('/sparepart/add/stock/:id', eventControll_SparePart.update_add_stock);
router.put('/sparepart/minus/stock/:id', eventControll_SparePart.update_minus_stock);
router.delete('/sparepart/:id', eventControll_SparePart.deleteEvent);

router.get('/log/all', eventControll_Repair_log.getAllEvents);
router.get('/log/:id', eventControll_Repair_log.getID);
router.get('/log/last/:id', eventControll_Repair_log.getIDLast);
router.post('/log/add', eventControll_Repair_log.addEvent);
router.put('/log/:id', eventControll_Repair_log.updateEvent);

router.get('/location', eventControll_Location_controll.getAllEvents);
router.get('/location/:id', eventControll_Location_controll.getById);
router.post('/location/add', eventControll_Location_controll.addEvent);
router.put('/location/:id', eventControll_Location_controll.updateEvent);
router.delete('/location/:id', eventControll_Location_controll.deleteEvent);

router.post('/upload', upload.single('image'), async (req, res) => {
  try{
    console.log(req.file);
  sql.close();
  const imagePath = `D:/WebLayout-react/public/image/${req.file.originalname}`; 
  const dept = req.body.dept;
  const pool = await sql.connect(config.sql);
  const result = await pool.request()
                  .input('dept', sql.NVarChar(30), dept)
                  .input('image_path', sql.NVarChar(500), imagePath)
                  .query('INSERT INTO Department (dept, image_path) VALUES (@dept, @image_path)');

  console.log(result);
  res.send("Single File upload success");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while uploading the file');
  }
});

router.post('/upload/bg', upload.single('image'), async (req, res) => {
  try{
    console.log(req.file);
  sql.close();
  const imagePath = `D:/WebLayout-react/public/image/${req.file.originalname}`;
  //const imagePath = `D:/WebLayout-react/public/image/${req.file.originalname}`;
  const dept = req.body.dept;
  const pool = await sql.connect(config.sql);
  const result = await pool.request()
                  .input('values_select', sql.NVarChar(30), dept)
                  .input('image_path', sql.NVarChar(100), imagePath)
                  .query('UPDATE Department SET image_path=@image_path WHERE dept=@dept');

  console.log(result);
  res.send("Single File update success");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while uploading the file');
  }
});

router.post('/upload/bg/new', upload.single('image'), async (req, res) => {
  try{
    console.log(req.file);
  sql.close();
  const imagePath = `D:/WebLayout-react/public/image/${req.file.originalname}`;
  
  const Uf_asset_Location = req.body.Uf_asset_Location;
  const pool = await sql.connect(config.sql);
  const result = await pool.request()
                  .input('Uf_asset_Location', sql.NVarChar(30), Uf_asset_Location)
                  .input('image_location', sql.NVarChar(200), imagePath)
                  .query(`UPDATE [Location_controll] 
                          SET [image_location] = @image_location
                          WHERE [Uf_asset_Location] = @Uf_asset_Location`);
  console.log(result);
  res.send("Single File update success");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while uploading the file');
  }
});

//send line notify
const axios = require('axios');
const LINE_NOTIFY_ACCESS_TOKEN = 'XXXXXXXXXXXXX';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/send-notification', async (req, res) => {
  try {
      const message = req.body.message;
      await axios.post(
          'https://notify-api.line.me/api/notify',
          `message=${message}`,
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Bearer ${LINE_NOTIFY_ACCESS_TOKEN}`
              }
          }
      );
      res.status(200).send('Notification sent successfully.');
  } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification.');
  }
});

module.exports = {
    routes: router
}
