import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function StationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStation();
  }, [id]);

  async function fetchStation() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/stations/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Station record was not found.");
      }

      const data = await response.json();
      setStation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="content">
      <button
        className="back-button"
        onClick={() => navigate("/stations")}
      >
        â† Back
      </button>

      {loading && <div className="status-box">Loading station details...</div>}

      {error && <div className="status-box error-box">{error}</div>}

      {!loading && !error && station && (
        <section className="details-card">
          <div className="details-icon">PC</div>

          <div>
            <p className="details-label">Station Name / PC Number</p>
            <h2>{station.station_name}</h2>
          </div>

          <div className="details-grid">
            <div>
              <span>Tier / Category</span>
              <strong>{station.category}</strong>
            </div>

            <div>
              <span>Hourly Rate</span>
              <strong>â‚±{Number(station.hourly_rate).toFixed(2)}</strong>
            </div>

            <div>
              <span>Station ID</span>
              <strong>#{station.id}</strong>
            </div>

            <div>
              <span>Created</span>
              <strong>
                {station.created_at
                  ? new Date(station.created_at).toLocaleString()
                  : "N/A"}
              </strong>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}