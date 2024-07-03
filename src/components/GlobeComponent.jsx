import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import forwardGeocode from './ForwardGeocode';


const getLocationData = async () => {   
    return await fetch('http://localhost:5174/api/location', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async response => {
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }
        return response.json();
    }).then(data => {
        return data.results;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const GlobeComponent = (reloadTrigger) => {
    const globeEl = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAndGeocodeData = async () => {
            const locations = await getLocationData();
            const geocodedLocations = await Promise.all(locations.map(async (location) => {
                const geocodedLocation = await forwardGeocode({
                    city: location.city,
                    state: location.state,
                    country: location.count
                });
                return {
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    lat: geocodedLocation.latitude,
                    lng: geocodedLocation.longitude,
                    count: location['COUNT(*)']
                };
            }));
            setData(geocodedLocations);
        };

        fetchAndGeocodeData();
    }, [reloadTrigger]);
    const scale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.count)])
        .range([0.5, 2]);

    return (  

        <Globe
        ref={globeEl}
        pointsData={data}
        initialCoordinates={[34.0549076, -118.242643]}
        pointAltitude={0}
        height='500'
        width='500'
        animateIn={true}
        pointRadius={d => scale(d.count)}
        pointColor={() => 'orange'}
        pointLabel={({ city, state, count }) => `${city}, ${state}: ${count}`}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    />
    );
};

export default GlobeComponent;
