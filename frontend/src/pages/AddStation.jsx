import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/stations";

export default function AddStation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    station_name: "",
    category: "",
    hourly_rate: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear the field error as the user corrects it
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.station_name.trim()) {
      newErrors.station_name = "Station Name / PC Number is required.";
    }

    if (!form.category) {
      newErrors.category = "Tier / Category is required.";
    }

    if (
      form.hourly_rate === "" ||
      Number.isNaN(Number(form.hourly_rate)) ||
      Number(form.hourly_rate) < 0
    ) {
      newErrors.hourly_rate = "Enter a valid hourly rate.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          station_name: form.station_name.trim(),
          category: form.category,
          hourly_rate: Number(form.hourly_rate),
        }),
      });

      if (!response.ok) {
        // Try to read Laravel validation errors if available
        const data = await response.json().catch(() => null);

        if (data?.errors) {
          setErrors({
            station_name: data.errors.station_name?.[0] ?? "",
            category: data.errors.category?.[0] ?? "",
            hourly_rate: data.errors.hourly_rate?.[0] ?? "",
          });
          return;
        }

        throw new Error("Could not save station.");
      }

      // Required by exam: return to list without manual refresh
      navigate("/stations");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="content">
      <div className="page-heading">
        <div>
          <h2>Add Station</h2>
          <p>Create a new PC rental workstation</p>
        </div>
      </div>

      <section className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Station Name / PC Number
            <input
              name="station_name"
              type="text"
              value={form.station_name}
              onChange={handleChange}
              placeholder="Example: PC-01"
            />
            {errors.station_name && (
              <span className="field-error">{errors.station_name}</span>
            )}
          </label>

          <label>
            Tier / Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Streaming Room">Streaming Room</option>
            </select>
            {errors.category && (
              <span className="field-error">{errors.category}</span>
            )}
          </label>

          <label>
            Hourly Rate (â‚±)
            <input
              name="hourly_rate"
              type="number"
              min="0"
              step="0.01"
              value={form.hourly_rate}
              onChange={handleChange}
              placeholder="Example: 50"
            />
            {errors.hourly_rate && (
              <span className="field-error">{errors.hourly_rate}</span>
            )}
          </label>

          {serverError && <p className="inline-error">{serverError}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/stations")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Station"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}