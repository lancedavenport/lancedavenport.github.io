import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api_key = process.env.API_KEY;

// Converts lat and long to city, state, country for easy recording in DB
const reverseGeocoding = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`;
    try {
        const response = await axios.get(url);
        const results = response.data.results[0].address_components;
        const location = {
            city: '',
            state: '',
            country: ''
        };
        results.forEach(component => {
            if (component.types.includes('locality')) {
                location.city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                location.state = component.short_name;
            }
            if (component.types.includes('country')) {
                location.country = component.long_name;
            }
        }
        )
        return location;
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
}


export default reverseGeocoding;