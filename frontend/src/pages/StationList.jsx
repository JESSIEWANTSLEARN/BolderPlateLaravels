import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/stations";

export default function StationList() {
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Required by the exam: fetch list when the screen mounts
  useEffect(() => {
    fetchStations();
  }, []);

  async function fetchStations() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not load station records.");
      }

      const data = await response.json();
      setStations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="content">
      <div className="page-heading">
        <div>
          <h2>Station List</h2>
          <p>Available computer cafe rental workstations</p>
        </div>

        <span className="count-badge">{stations.length} station(s)</span>
      </div>

      {loading && <div className="status-box">Loading stations...</div>}

      {error && <div className="status-box error-box">{error}</div>}

      {!loading && !error && stations.length === 0 && (
        <div className="status-box">
          No stations yet. Use the + button to add one.
        </div>
      )}

      {!loading && !error && stations.length > 0 && (
        <div className="station-grid">
          {stations.map((station) => (
            <button
              key={station.id}
              className="station-card"
              onClick={() => navigate(`/stations/${station.id}`)}
            >
              <div className="station-number">PC</div>

              <div className="station-card-text">
                <h3>{station.station_name}</h3>
                <p>{station.category}</p>
              </div>

              <span className="view-details">Details â†’</span>
            </button>
          ))}
        </div>
      )}

      {/* Required floating action button */}
      <button
        className="fab"
        onClick={() => navigate("/stations/add")}
        aria-label="Add station"
        title="Add Station"
      >
        +
      </button>
    </main>
  );
}