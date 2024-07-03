import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import GlobeComponent from "../../GlobeComponent";



export default function MyLanding() {
    const [reloadTrigger, setReloadTrigger] = useState(0);
    // This function will get the location of the user and be used in the SQL db

    const getLocationAndSend = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        sendLocationToDB(latitude, longitude);
    }

    const sendLocationToDB = (lat, long) => {
        fetch( 'http://localhost:5174/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({latitude: lat, longitude: long }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        }).then(data => {
            setReloadTrigger(prev => prev + 1)
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
    }


    return (
        <div>
            <Container fluid>
                <Row className="justify-content-center align-items-center text-center">
                    <Col xs={12} lg={6}>
                        <h1>Welcome to My Personal Website!</h1>
                        <p>Here you can find more information about me, some of my projects, and an easy way to contact me.</p>
                        <p>With your permission, I have built a tool where I (and you) can see the locations of the page viewers.</p>
                        <Button onClick={getLocationAndSend} style={{}}>Allow location tracking</Button>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className="globe-container">
                            <GlobeComponent reloadTrigger={reloadTrigger} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}