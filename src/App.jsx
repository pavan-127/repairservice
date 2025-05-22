import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import LocationPopup from "./LocationPopup.jsx";
import MobileRepairForm from "./MobileRepairForm";

export default function App() {
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Hyderabad"); // default location

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setShowLocation(false);

    // Optional: Send selected location to backend
    try {
      await fetch("https://your-backend-api.com/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      console.log("Location sent to admin:", location);
    } catch (error) {
      console.error("Failed to send location:", error);
    }
  };

  return (
    <>
    <Router>

      <div className="min-h-screen bg-gray-100">
        {/* Navbar stays on all pages */}
        <Navbar
          onLocationClick={() => setShowLocation(true)}
          selectedLocation={selectedLocation}
        />

        {/* Location popup if user clicks location */}
        {showLocation && (
          <LocationPopup
            onClose={() => setShowLocation(false)}
            onSelectLocation={handleLocationSelect}
          />
        )}

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-repair" element={<MobileRepairForm />} />
        </Routes>
       
      </div>
    </Router>
    
    </>
  );
}
