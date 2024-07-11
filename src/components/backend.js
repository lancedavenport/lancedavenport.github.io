import { createPool } from 'promise-mysql';
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import reverseGeocoding from '../ReverseGeocoding.js';
import dotenv from 'dotenv';

dotenv.config();

const { json } = pkg;
const app = express();
const port = 5174;
const api_key = process.env.API_KEY;

const createTcpPool = async (config) => {
    return createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        connectTimeout: 31536000,
        acquireTimeout: 31536000,
        ...config,
    });
};
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204 
  };
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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

app.post('/api/location/forward', async (req, res) => {
    const { city, state, country } = req.body;
    if (!city || !state || !country) {
        return res.status(400).json({ success: false, message: 'City, state, and country are required' });
    }

    try {
        const location = await forwardGeocode({ city, state, country });
        res.json({ success: true, location });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching location' });
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
        pool.end(); 
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
        pool.end();
    }
};

const forwardGeocode = async (address) => {
    const addressString = `${address.city}, ${address.state}, ${address.country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${api_key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        const results = data.results[0].geometry.location;
        console.log(results)
        return {
            latitude: results.lat,
            longitude: results.lng
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
};

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
