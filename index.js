'use strict';
const express = require('express');
const sql = require('mssql');
const config  = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const ScanRoutes = require('./routes/eventScan');
const ScanF2Route = require('./routes/eventScan_F2');
const ScanWipRoutes = require('./routes/eventScanWip');
const DeliveryRoutes = require('./routes/eventDelivery');
//const DeliveryF2Routes = require('./routes/eventDelivery_F2');
const WebLayoutRoutes = require('./routes/eventWebLayout');
const LoginRoutes = require('./routes/eventLogin');
const SecureItemOut = require('./routes/eventSecure_item_out');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}))

app.use('/delivery/f2/DeliveryF2', express.static(path.join(__dirname, 'DeliveryF2')));
app.use('/delivery/f1/DeliveryF1', express.static(path.join(__dirname, 'DeliveryF1')));
//app.use('/delivery/f1/ImageF1', express.static(path.join(null, 'D:/Web-delivery/build/ImageF1')));
app.use('/ctrl',eventRoutes.routes);
app.use('/scan',ScanRoutes.routes);
app.use('/scanf2',ScanF2Route.routes);
app.use('/scanwip',ScanWipRoutes.routes);
app.use('/delivery/f1',DeliveryRoutes.routes);
//app.use('/delivery/f2',DeliveryF2Routes.routes);
app.use('/web',WebLayoutRoutes.routes);
app.use('/web/login', LoginRoutes.routes);
app.use('/secure', SecureItemOut.routes);

app.get('/',function(req,res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.sendFile(path.resolve(__dirname,'D:/Application_API/homepage_api.html'))
});

app.post('/login', async (req, res) => {          // login Mobile App using
    const { Username, WorkstationLogin } = req.body;
  
    try {
        await sql.close();
        const pool = await sql.connect({
            server: "CYF_SERVER_03",
            user: "sa",
            password: "SysAdm!n",
            database: "CYF_LIV_APP",
            options: {
                trustServerCertificate: true
              }
          });

      const result = await pool.request()
      .input('Username', sql.NVarChar, Username)
      .query('SELECT * FROM [UserNames] WHERE Username = @username');

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      if (WorkstationLogin === user.WorkstationLogin) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      if((Username === 'admin' && WorkstationLogin === 'admin123') || (Username === 'user' && WorkstationLogin === 'user123')){
        res.json({ message: 'Login successful' });
        } else{
          res.status(404).json({ error: 'Invalid password' });
        }
      //res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// const axios = require('axios');
// const cron = require('node-cron');
// const sql = require('mssql');
// const cheerio = require('cheerio');

// const config = {
//   server: '192.168.10.114',
//   database: 'Application',
//   user: 'sa',
//   password: 'Cyf027065055',
//   options: {
//       encrypt: false, // For secure connection
//       trustServerCertificate: true,
//   },
// };

// const fetchData = async (isEvening) => {
//   try {
//       const response = await axios.get('http://ad00/infor/working.aspx');
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // Extract data from the HTML table
//       let processedData = [];
//       $('table tr').each((index, element) => {
//           const row = $(element).find('td');
//           if (row.length) {
//               const item = {
//                   No: $(row[0]).text(),
//                   Date: $(row[1]).text(),
//                   Parent_code: $(row[2]).text(),
//                   Parent_desc: $(row[3]).text(),
//                   child_code: $(row[4]).text(),
//                   child_desc: $(row[5]).text(),
//                   ssn: $(row[6]).text(),
//                   title: $(row[7]).text(),
//                   name: $(row[8]).text(),
//                   surname: $(row[9]).text(),
//                   phone: $(row[10]).text(),
//                   sf_code: $(row[11]).text(),
//                   sf_desc: $(row[12]).text(),
//                   stamp_1: $(row[13]).text(),
//                   stamp_2: $(row[14]).text(),
//                   stamp_3: $(row[15]).text(),
//                   stamp_4: $(row[16]).text(),
//               };
//               processedData.push(item);
//           }
//       });

//       // Connect to the SQL database
//       await sql.connect(config);
//       console.log('Connected to the database!');

//       const transaction = new sql.Transaction();
//       await transaction.begin();

//       // Delete old data if it's the evening schedule
//       if (isEvening) {
//           const deleteRequest = new sql.Request(transaction);
//           const deleteQuery = `DELETE FROM BplusData WHERE CONVERT(VARCHAR(10), [Insert_date], 23) = @Date`;
//           await deleteRequest.input('Date', sql.NVarChar, processedData[0].Date).query(deleteQuery);
//           console.log('Old data deleted successfully!');
//       }

//       // Insert new data
//       try {
//           for (const item of processedData) {
//               const request = new sql.Request(transaction);
//               const query = `INSERT INTO BplusData (No, Date, Parent_code, Parent_desc, Child_code, Child_desc, SSN, Title, Name, Surname, Phone, SF_code, SF_desc, Stamp_1, Stamp_2, Stamp_3, Stamp_4) 
//                              VALUES (@No, @Date, @Parent_code, @Parent_desc, @Child_code, @Child_desc, @SSN, @Title, @Name, @Surname, @Phone, @SF_code, @SF_desc, @Stamp_1, @Stamp_2, @Stamp_3, @Stamp_4)`;
//               await request
//                   .input('No', sql.NVarChar, item.No)
//                   .input('Date', sql.NVarChar, item.Date)
//                   .input('Parent_code', sql.NVarChar, item.Parent_code)
//                   .input('Parent_desc', sql.NVarChar, item.Parent_desc)
//                   .input('Child_code', sql.NVarChar, item.child_code)
//                   .input('Child_desc', sql.NVarChar, item.child_desc)
//                   .input('SSN', sql.NVarChar, item.ssn)
//                   .input('Title', sql.NVarChar, item.title)
//                   .input('Name', sql.NVarChar, item.name)
//                   .input('Surname', sql.NVarChar, item.surname)
//                   .input('Phone', sql.NVarChar, item.phone)
//                   .input('SF_code', sql.NVarChar, item.sf_code)
//                   .input('SF_desc', sql.NVarChar, item.sf_desc)
//                   .input('Stamp_1', sql.NVarChar, item.stamp_1)
//                   .input('Stamp_2', sql.NVarChar, item.stamp_2)
//                   .input('Stamp_3', sql.NVarChar, item.stamp_3)
//                   .input('Stamp_4', sql.NVarChar, item.stamp_4)
//                   .query(query);
//           }

//           await transaction.commit();
//           console.log('Data inserted successfully!');
//       } catch (err) {
//           await transaction.rollback();
//           console.error('Transaction error:', err);
//       } finally {
//           sql.close();
//           console.log('Disconnected from the database.');
//       }
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// };

// // Schedule tasks
// cron.schedule('19 08 * * *', () => fetchData(false)); // Run every day at 10:00
// cron.schedule('00 13 * * *', () => fetchData(true)); // Run every day at 13:00
// cron.schedule('00 23 * * *', () => fetchData(true)); // Run every day at 21:00



app.listen(config.port,()=>
console.log('app listening on url http://localhost:' + config.port 
));

 