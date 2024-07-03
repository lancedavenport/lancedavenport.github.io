import axios from 'axios';
import dotenv from 'dotenv';



const api_key = "AIzaSyDVDm7cbCuwxV5NOFLDXgRy1z-guqPzHTM";

const forwardGeocode = async (address) => {
    const addressString = `${address.city}, ${address.state}, ${address.country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${api_key}`
    try {
        const response = await axios.get(url);
        const results = response.data.results[0].geometry.location;
        return {
            latitude: results.lat,
            longitude: results.lng
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
}

export default forwardGeocode;