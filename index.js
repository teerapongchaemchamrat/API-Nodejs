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
            password: "XXXXXXXXXX",
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

app.listen(config.port,()=>
console.log('app listening on url http://localhost:' + config.port 
));

 
