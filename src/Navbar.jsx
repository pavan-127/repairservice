import React, { useState } from "react";
import "./Navbar.css";
import LocationPopup from "./LocationPopup"; // ✅ Import popup component

export default function Navbar() {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Your Location"); // Default location

  const handleLocationClick = () => {
    setShowLocationPopup(true);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // ✅ Update text
    console.log("Selected location to send to admin:", location); // ✅ Send to admin (placeholder)
    // Here you can also call an API to send to admin
    setShowLocationPopup(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <img src={"Logo.svg"} alt="MobileRepair" className="logo" />
          <input
            type="text"
            placeholder="Search for mobiles, accessories & More"
            className="search-bar"
          />
        </div>

        <div className="navbar-right">
          <div
            className="location"
            onClick={handleLocationClick}
            style={{ cursor: "pointer" }}
          ><button className="location">
            <span className="location-icon">📍</span> {selectedLocation} ▼
            </button>
          </div>
          
        </div>
      </header>

  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav ">

        {/* <!-- All Dropdown --> */}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">All</a>
          <div class="dropdown-menu mega-dropdown p-3 shadow border-0">
            <div class="row">
              {/* <!-- Repair Column --> */}
              <div class="col-md-6 mega-column">
                <div class="dropdown-header">Repair</div>
                <a class="dropdown-item" href="#">Apple</a>
                <a class="dropdown-item" href="#">Samsung</a>
                <a class="dropdown-item" href="#">OnePlus</a>
                <a class="dropdown-item" href="#">Xiaomi</a>
                <a class="dropdown-item" href="#">Realme</a>
                <a class="dropdown-item" href="#">Vivo</a>
                <a class="dropdown-item" href="#">Oppo</a>
              </div>
              {/* <!-- Buy Column --> */}
              <div class="col-md-6 mega-column">
                <div class="dropdown-header">Buy</div>
                <span class="dropdown-item text-muted">Buy Phone – Coming soon</span>
                <span class="dropdown-item text-muted">Buy Laptop – Coming soon</span>
                <hr/>
                <div class="dropdown-header">Phone</div>
                <a class="dropdown-item" href="#">Explore Phones</a>
              </div>
            </div>
          </div>
        </li>

        {/* <!-- Buy Phone & Laptop --> */}
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">Buy Phone – Coming soon</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-muted" href="#">Buy Laptop – Coming soon</a>
        </li>

        {/* <!-- Buy Mobiles Dropdown --> */}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Buy Mobiles</a>
          <ul class="dropdown-menu shadow border-0">
            <li><a class="dropdown-item" href="#">Apple</a></li>
            <li><a class="dropdown-item" href="#">Samsung</a></li>
            <li><a class="dropdown-item" href="#">Xiaomi</a></li>
            <li><a class="dropdown-item" href="#">OnePlus</a></li>
            <li><a class="dropdown-item" href="#">Realme</a></li>
            <li><a class="dropdown-item" href="#">Vivo</a></li>
            <li><a class="dropdown-item" href="#">Oppo</a></li>
            <li><a class="dropdown-item" href="#">Motorola</a></li>
          </ul>
        </li>

        {/* <!-- Contact Us & Refer --> */}
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Refer & Earn</a>
        </li>

      </ul>
    </div>
  </div>
</nav>


      {showLocationPopup && (
  <LocationPopup
    onClose={() => setShowLocationPopup(false)}
    onSelectLocation={(location) => {
      setSelectedLocation(location);
      console.log("Send to admin:", location); // 🔁 API POST if needed
    }}
  />
)}

    </>
  );
}
