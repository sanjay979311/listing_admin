import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPackage = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const [planType, setPlanType] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing package details
  useEffect(() => {
    // Simulate fetch with fake data (replace with your actual API)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Simulate mapping API data to your fields
        setPlanType("monthly"); // Example: Replace with actual data.planType
        setPlanPrice(499);      // Example: Replace with actual data.planPrice
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching package:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPackage = { id, planType, planPrice };
    console.log("Updated Package:", updatedPackage);

    // You can call your PUT/PATCH API here
    // fetch(`/api/packages/${id}`, { method: "PUT", body: JSON.stringify(updatedPackage) })

    alert("Package updated successfully!");
    navigate("/dashboard/packages"); // redirect back to list (adjust as needed)
  };

  if (loading) {
    return <div className="text-center mt-5">Loading package details...</div>;
  }

  return (
    <div className="mt-3 border rounded bg-light p-3">
      <h6 className="fw-semibold mb-3">Edit Package (ID: {id})</h6>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Plan Type Dropdown */}
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Plan Type</label>
            <select
              className="form-control"
              required
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            >
              <option value="">--select plan type--</option>
              <option value="monthly">1 Month</option>
              <option value="quarterly">3 Months</option>
              <option value="half_yearly">6 Months</option>
              <option value="yearly">1 Year</option>
            </select>
          </div>

          {/* Plan Price Input */}
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Plan Price (₹)</label>
            <input
              type="number"
              className="form-control"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
              placeholder="Enter plan price"
              required
              min="0"
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-success btn-sm">
            Update Package
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
