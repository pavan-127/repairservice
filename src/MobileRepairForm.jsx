import React, { useState, useEffect } from "react";

export default function MobileRepairForm() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [coords, setCoords] = useState(null);

  // Auto-fetch user's location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setLocationLink(link);
          setCoords({ latitude, longitude });
        },
        (error) => {
          alert("📍 Please allow location access for booking to work.");
          console.error("Location error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const sendToWhatsApp = () => {
    if (!name || !model || !problem || !locationLink) {
      alert("Please fill all fields and allow location access.");
      return;
    }

    const message = `🛠️ Repair Booking:

👤 Name: ${name}
📱 Mobile Model: ${model}
❗ Problem: ${problem}
📍 Location: ${locationLink}`;

    const encoded = encodeURIComponent(message);
    const yourNumber = "917396570795"; // Replace with your WhatsApp number
    const url = `https://wa.me/${yourNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">📲 Book Mobile Repair</h2>
      <div className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Model</label>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Problem Description</label>
          <textarea
            className="form-control"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        {coords && (
          <div className="mb-3">
            <label className="form-label">Your Location</label>
            <iframe
              title="User Location"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${coords.latitude},${coords.longitude}&z=15&output=embed`}
            ></iframe>
          </div>
        )}

        <button className="btn btn-success w-100" onClick={sendToWhatsApp}>
          📤 Submit to WhatsApp
        </button>
      </div>
    </div>
  );
}
