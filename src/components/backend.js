import { createPool } from 'promise-mysql';
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import reverseGeocoding from './ReverseGeocoding.js';

require('dotenv').config();

const { json } = pkg;

const app = express();
const port = 5174;

const createTcpPool = async config => {
  return createPool({
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    host: process.env.DB_HOST,
    port: 3306,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    ...config,
  });
};

app.use(cors());
app.use(json());

app.post('/api/location', async (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({ success: false, message: 'Latitude or Longitude is missing' });
    }
    try {
        const location = await reverseGeocoding(latitude, longitude);
        await addLocation(location.city, location.state, location.country);
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).json({ success: false, message: 'Error adding location' });
    }
});

app.get('/api/location', async (req, res) => {
    try {
        const locations = await getLocations();
        res.json({ success: true, results: locations });
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ success: false, message: 'Error fetching locations' });
    }
});

const getLocations = async () => {
    const pool = await createTcpPool();
    try {
        const connection = await pool.getConnection();
        const result = await connection.query("SELECT COUNT(*), city, state, country as count FROM `user_cities` GROUP BY city, state, country");
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        pool.end(); // Release the connection back to the pool
    }
};

const addLocation = async (city, state, country) => {
    const pool = await createTcpPool();
    try {
        const connection = await pool.getConnection();
        const result = await connection.query('INSERT INTO user_cities (city, state, country) VALUES (?, ?, ?)', [city, state, country]);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        pool.end(); // Release the connection back to the pool
    }
};

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
