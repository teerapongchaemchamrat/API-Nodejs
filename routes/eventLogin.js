'use strict';
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../config_weblayout')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'XXXXXXXXXXXXXXXXXXXXX'

router.get('/list/user', async (req, res) => {
    try{
        sql.close();
        const pool = await sql. connect(config.sql);
        const result = await pool.request().query('SELECT [Username] FROM [Usernames]')
        const usernames = result.recordset.map(record => record.Username);
        res.json(usernames);
    } catch (err) {
        console.error('Error fetching user list', err);
        res.status(500).send('Error fetching user list');
    }
});

router.post('/register', async (req, res) => {
    const { username, password, fullname, role, createby } = req.body;
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert the user into the database
    try {
        sql.close();
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .query('SELECT * FROM [Usernames] WHERE [Username] = @username');
        if (result.recordset.length > 0) {
            // If the username already exists, return an error
            return res.status(400).send('Username already exists');
        }
    } catch (err) {
        console.error('Error checking username', err);
        return res.status(500).send('Error checking username');
    };
    try {
        sql.close();
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
                            .input('username', sql.NVarChar(50), username)
                            .input('password', sql.NVarChar, hashedPassword)
                            .input('fullname', sql.NVarChar(100), fullname)
                            .input('role', sql.NVarChar(50), role)
                            .input('createby', sql.NVarChar(50), createby)
                            .query(`INSERT INTO [Usernames] ([Username], [Password], [Fullname], [Role], [create_by]) 
                                    VALUES (@username, @password, @fullname, @role, @createby)`);
        res.status(200).send('User registered successfully');
        console.log(result);
        
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    };
});

router.put('/forget/password', async (req, res) => {
    const { username, password, updateby } = req.body;
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert the user into the database
    try {
        sql.close();
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
                            .input('username', sql.NVarChar(50), username)
                            .input('password', sql.NVarChar, hashedPassword)
                            .input('updateby', sql.NVarChar(50), updateby)
                            .query(`UPDATE [Usernames] 
                                    SET [Password]=@password, [update_by]=@updateby
                                    WHERE [Username] = @username`);
        res.status(201).send('User change password successfully');
        console.log(result);
    } catch (err) {
        console.error('Error change password user', err);
        res.status(500).send('Error change password user');
    };
});

router.put('/role/update', async (req, res) => {
    const { username, role, updateby } = req.body;
   
    // Insert the user into the database
    try {
        sql.close();
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
                            .input('username', sql.NVarChar(50), username)
                            .input('role', sql.NVarChar(50), role)
                            .input('updateby', sql.NVarChar(50), updateby)
                            .query(`UPDATE [Usernames]
                                    SET [Role] = @role, [update_by] = @updateby 
                                    WHERE Username = @username`);
        res.status(201).send('User update successfully');
        console.log(result);
    } catch (err) {
        console.error('Error update user', err);
        res.status(500).send('Error update user');
    };
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        sql.close();
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.NVarChar(50), username)
            .query('SELECT * FROM [Usernames] WHERE [Username] = @username');
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.Password); // Compare with hashed password stored in the database
        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }
        const tokenPayload = {
            username: user.Username,
            role: user.Role // Assuming 'Role' is the field containing the user's role in the database
        };
        const token = jwt.sign(tokenPayload , secretKey, { expiresIn: '1h' });
        res.json({ username: user.Username, passwordMatch, fullname: user.Fullname, role: user.Role, token });
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    };
});

router.get('/protected', (req, res) => {
    // Verify JWT token
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.split(' ')[1], secretKey);

        // Access token claims
        console.log('Decoded Token:', decoded);

        // If verification is successful, respond with a welcome message
        res.send(`Welcome ${decoded.username}!`);
    } catch (err) {
        // If verification fails, respond with an unauthorized error
        console.error('Error verifying token', err);
        res.status(401).send('Unauthorized');
    };
});

module.exports = {
    routes: router
}
