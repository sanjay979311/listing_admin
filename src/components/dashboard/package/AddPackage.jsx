

import React, { useState } from "react";

const AddPackage = () => {
  const [planType, setPlanType] = useState("");
  const [planPrice, setPlanPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: Handle form submission (send to backend or log)
    const newPackage = { planType, planPrice };
    console.log("Package Added:", newPackage);

    // Reset form fields
    setPlanType("");
    setPlanPrice("");
  };

  return (
    <div className="mt-3 border rounded bg-light p-3">
      <h6 className="fw-semibold mb-3">Add New Package</h6>

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
          <button type="submit" className="btn btn-primary btn-sm">
            Add Package
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setPlanType("");
              setPlanPrice("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
