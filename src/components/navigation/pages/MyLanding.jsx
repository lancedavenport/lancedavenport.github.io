import { useEffect, useState } from "react";
import GlobeComponent from "../../GlobeComponent";
import "../../../styles/MyLanding.css";

export default function MyLanding() {
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const trackingAllowed = localStorage.getItem("trackingAllowed");
    if (trackingAllowed === "true") {
      setAllowed(true);
    }
  }, []);

  const getLocationAndSend = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    sendLocationToDB(latitude, longitude);
    setAllowed(true);
    localStorage.setItem("trackingAllowed", "true");
  }

  const sendLocationToDB = (lat, long) => {
    fetch(
      "https://my-website-7sqofafty-lancedavenports-projects.vercel.app/api/location",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude: lat, longitude: long }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const interval = setInterval(() => {
          setReloadTrigger((prev) => !prev);
        }, 300000);
        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="landing-center">
        <div className="landing-format global-text text-center">
          <div className="landing-text">
            <h1>Welcome to My Personal Website!</h1>
            <p>
              Discover more about me, explore my projects, and get in touch
              easily.
            </p>
            <p>
              With your consent, I have developed a tool to track the locations
              of page visitors.
            </p>
            {!allowed && (
              <button onClick={getLocationAndSend}>
                Enable Location Tracking
              </button>
            )}
          </div>
          <div className="landing-globe">
            <div className="globe-container">
              <GlobeComponent reloadTrigger={reloadTrigger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
