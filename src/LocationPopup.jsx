import React, { useState, useEffect, useRef } from "react";
import "./LocationPopup.css";

export default function LocationPopup({ onClose, onSelectLocation }) {
  const [detectedAddress, setDetectedAddress] = useState("Detecting your location...");
  const popupRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.address;

            const mandal = address.suburb || address.village || address.hamlet || address.town || "";
            const city = address.city || address.county || address.state_district || "";
            const state = address.state || "";
            const pincode = address.postcode || "";

            const fullAddress = [mandal, city, state, pincode]
              .filter(Boolean)
              .join(", ");

            setDetectedAddress(fullAddress);
          } catch (err) {
            setDetectedAddress("Unable to detect location.");
          }
        },
        () => {
          setDetectedAddress("Permission denied.");
        }
      );
    } else {
      setDetectedAddress("Geolocation not supported.");
    }
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const cities = [
    { name: "B.N Reddy", icon: "🏢" },
    { name: "Dilsukhnagar", icon: "🛕" },
    { name: "Hyderabad", icon: "🕌" , active: true},
    { name: "Kothapet", icon: "🏙️"  },
    { name: "L.B Nagar", icon: "🕌" },
    { name: "Nagole", icon: "🏛️" },
    { name: "Panama", icon: "🏰" },
    { name: "Uppal", icon: "🏬" },
    { name: "Victoria Memorial", icon: "🧱" },
  ];

  const handleLocationSelect = (location) => {
    onSelectLocation(location);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container" ref={popupRef}>
        <div className="popup-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="location-detect">
          <h3>Your Current Location</h3>
          <button
            className="detected-location-btn"
            onClick={() => handleLocationSelect(detectedAddress)}
          >
            📍 {detectedAddress}
          </button>
        </div>

        <div className="city-section">
          <h3>Nearby Places</h3>
          <div className="city-grid">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className={`city-item ${city.active ? "active-city" : ""}`}
                onClick={() => handleLocationSelect(city.name)}
              >
                <div className="city-icon">{city.icon}</div>
                <span>{city.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="view-all">Select Your Location</div>
      </div>
    </div>
  );
}
