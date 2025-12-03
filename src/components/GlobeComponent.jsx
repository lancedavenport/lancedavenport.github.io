import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';

const getLocationData = async () => {   
    return await fetch('https://my-website-7sqofafty-lancedavenports-projects.vercel.app/api/location', {
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

const getLongLat = async (location) => {
        return await fetch('https://my-website-7sqofafty-lancedavenports-projects.vercel.app/api/location/forward', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city: location.city, state: location.state, country: location.country}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

const GlobeComponent = ({reloadTrigger}) => {
    const globeEl = useRef();
    const [data, setData] = useState([]);
    const [width, setWidth] = useState(window.innerWidth > 768 ? 700 : window.innerWidth - 32);
    const [height, setHeight] = useState(window.innerWidth > 768 ? 500 : window.innerWidth - 32);
    const geocodeCacheRef = useRef({});

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 768 ? 700 : window.innerWidth - 32); 
            setHeight(window.innerWidth > 768 ? 500 : window.innerWidth - 32); 
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const storedCache = localStorage.getItem('geocodeCache');

        if (storedCache) {
            try {
                geocodeCacheRef.current = JSON.parse(storedCache);
            } catch (error) {
                console.error('Failed to parse cached geocode data:', error);
                geocodeCacheRef.current = {};
            }
        }
    }, []);

    useEffect(() => {
        const fetchAndGeocodeData = async () => {
            const locations = await getLocationData();

            if (!Array.isArray(locations)) {
                setData([]);
                return;
            }

            const geocodedLocations = await Promise.all(locations.map(async (location) => {
                const cacheKey = `${location.city}|${location.state}|${location.country}`;
                let cachedLocation = geocodeCacheRef.current[cacheKey];

                if (!cachedLocation) {
                    const fetchedLocation = await getLongLat(location);
                    if (!fetchedLocation?.location) {
                        return null;
                    }

                    cachedLocation = {
                        lat: fetchedLocation.location.latitude,
                        lng: fetchedLocation.location.longitude,
                    };
                    geocodeCacheRef.current[cacheKey] = cachedLocation;
                }

                const count = Number(location.count ?? location['COUNT(*)']) || 0;

                return {
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    lat: cachedLocation.lat,
                    lng: cachedLocation.lng,
                    count,
                };
            }));

            const filteredLocations = geocodedLocations.filter(Boolean);
            setData(filteredLocations);
            localStorage.setItem('geocodeCache', JSON.stringify(geocodeCacheRef.current));
        };

        fetchAndGeocodeData();
    }, [reloadTrigger]);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = -0.1; 
            globeEl.current.pointOfView({lat: 34.0549076, lng: -118.242643, altitude: 2});
        }
    }, []);

    const maxCount = data.length ? d3.max(data, d => d.count) : 0;
    const scale = d3.scaleSqrt()
    .domain([0, Math.max(1, maxCount || 0)])
    .range([0.5, 2]);


    return (  
        <Globe
        ref={globeEl}
        labelsData={data}
        labelLabel={({ city, state, count }) => `${city}, ${state}: ${count}`}
        labelLat={d => d.lat}
        labelLng={d => d.lng}
        labelText={({ city, count }) => `${city}: ${count}`}
        labelColor={() => 'orange'}
        labelAltitude={0.01}
        labelSize={d => scale(d.count)}
        labelRotation={1}
        labelResolution={3}
        labelIncludeDot={true}
        labelDotRadius={d => scale(d.count)}
        labelDotOrientation={() => 'bottom'}
        labelsTransitionDuration={1000}
        animateIn={true}
        height={height}
        width={width}
        cameraRotateSpeed={1}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        />
    );
};

export default GlobeComponent;
