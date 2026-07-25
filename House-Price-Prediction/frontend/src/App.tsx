import { useState } from "react";
import "./App.css";

const locationsList = [
  "agra", "ahmadnagar", "ahmedabad", "allahabad", "aurangabad", "badlapur", 
  "bangalore", "belgaum", "bhiwadi", "bhiwandi", "bhopal", "bhubaneswar", 
  "chandigarh", "chennai", "coimbatore", "dehradun", "durgapur", "ernakulam", 
  "faridabad", "ghaziabad", "goa", "greater-noida", "guntur", "gurgaon", 
  "guwahati", "gwalior", "haridwar", "hyderabad", "indore", "jabalpur", 
  "jaipur", "jamshedpur", "jodhpur", "kalyan", "kanpur", "kochi", 
  "kolkata", "kozhikode", "lucknow", "ludhiana", "madurai", "mangalore", 
  "mohali", "mumbai", "mysore", "nagpur", "nashik", "navi-mumbai", 
  "navsari", "nellore", "new-delhi", "noida", "palakkad", "palghar", 
  "panchkula", "patna", "pondicherry", "pune", "raipur", "rajahmundry", 
  "ranchi", "satara", "shimla", "siliguri", "solapur", "sonipat", 
  "surat", "thane", "thrissur", "tirupati", "trichy", "trivandrum", 
  "udaipur", "udupi", "vadodara", "vapi", "varanasi", "vijayawada", 
  "visakhapatnam", "vrindavan", "zirakpur"
];

function App() {
  const [formData, setFormData] = useState({
    location: "",
    carpetArea: "",
    floor: "",
    totalFloors: "",
    bathrooms: "",
    balconies: "",
    carParking: "",
    furnishing: "Furnished",
    transaction: "New Property",
    ownership: "Freehold",
    facing: "North",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          carpet_area_sqft: Number(formData.carpetArea),
          floor_num: Number(formData.floor),
          total_floors: Number(formData.totalFloors),
          bathroom: Number(formData.bathrooms),
          balcony: Number(formData.balconies),
          car_parking: Number(formData.carParking),
          furnishing: formData.furnishing,
          transaction: formData.transaction,
          ownership: formData.ownership,
          facing: formData.facing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed");
      }

      setPrediction(data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      location: "",
      carpetArea: "",
      floor: "",
      totalFloors: "",
      bathrooms: "",
      balconies: "",
      carParking: "",
      furnishing: "Furnished",
      transaction: "New Property",
      ownership: "Freehold",
      facing: "North",
    });

    setPrediction(null);
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h2 className="logo">
          Estate<span>Ledger</span>
        </h2>
        <p className="tag">AUTOMATED VALUATION</p>
      </header>

      <hr />

      <section className="hero">
        <p className="small-title">PROPERTY DETAILS INTAKE</p>
        <h1>
          What's this property <br />
          actually worth?
        </h1>
      </section>

      <section className="cards">
        <div className="left-card">
          <h2>Property details</h2>
          <form className="property-form" onSubmit={handleSubmit}>
            <label>Location</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select location</option>
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>
                  {loc
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>

            <label>Carpet Area (sqft)</label>
            <input
              type="number"
              name="carpetArea"
              placeholder="1200"
              value={formData.carpetArea}
              onChange={handleChange}
              min="100"
              max="100000"
              required
            />

            <label>Floor</label>
            <input
              type="number"
              name="floor"
              placeholder="2"
              value={formData.floor}
              onChange={handleChange}
              min="0"
              max="100"
            />

            <label>Total Floors</label>
            <input
              type="number"
              name="totalFloors"
              placeholder="10"
              value={formData.totalFloors}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />

            <label>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              placeholder="2"
              value={formData.bathrooms}
              onChange={handleChange}
              min="1"
              max="20"
            />

            <label>Balconies</label>
            <input
              type="number"
              name="balconies"
              placeholder="1"
              value={formData.balconies}
              onChange={handleChange}
              min="0"
              max="10"
            />

            <label>Car Parking</label>
            <input
              type="number"
              name="carParking"
              placeholder="1"
              value={formData.carParking}
              onChange={handleChange}
              min="0"
              max="20"
              required
            />

            <label>Furnishing</label>
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
            >
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>

            <label>Transaction</label>
            <select
              name="transaction"
              value={formData.transaction}
              onChange={handleChange}
            >
              <option value="New Property">New Property</option>
              <option value="Resale">Resale</option>
            </select>

            <label>Ownership</label>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
            >
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>

            <label>Facing</label>
            <select
              name="facing"
              value={formData.facing}
              onChange={handleChange}
            >
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>

            <div className="button-group">
              <button type="submit" className="predict-btn" disabled={loading}>
                {loading ? "Calculating..." : "Get Valuation"}
              </button>
              <button type="button" className="reset-btn" onClick={handleReset} disabled={loading}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="right-card">
          <h2>Ledger</h2>
          <div className="ledger-box">
            <p>
              Location:{" "}
              <span>
                {formData.location
                  ? formData.location
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
                  : "Not selected"}
              </span>
            </p>

            <p>
              Area:{" "}
              <span>
                {formData.carpetArea
                  ? `${formData.carpetArea} sqft`
                  : "-- sqft"}
              </span>
            </p>

            <p>
              Floor: <span>{formData.floor || "--"}</span>
            </p>

            <p>
              Total Floors: <span>{formData.totalFloors || "--"}</span>
            </p>

            <p>
              Bathrooms: <span>{formData.bathrooms || "--"}</span>
            </p>

            <p>
              Balconies: <span>{formData.balconies || "--"}</span>
            </p>

            <p>
              Car Parking: <span>{formData.carParking || "--"}</span>
            </p>

            <p>
              Furnishing: <span>{formData.furnishing}</span>
            </p>

            <p>
              Transaction: <span>{formData.transaction}</span>
            </p>

            <p>
              Ownership: <span>{formData.ownership}</span>
            </p>

            <p>
              Facing: <span>{formData.facing}</span>
            </p>
          </div>

          <div className="valuation-card">
            <p className="valuation-title">ESTIMATED VALUATION</p>
            <div className="price-display">
              {loading ? (
                <div className="loading-spinner"></div>
              ) : prediction !== null ? (
                <h3 className="price-tag">${prediction.toLocaleString()}</h3>
              ) : (
                <h3 className="price-placeholder">$ -- , -- --</h3>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;