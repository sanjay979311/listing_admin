import React, { useState } from "react";

const Pricing = () => {
  const [formData, setFormData] = useState({
    price: "",
    discount: "",
    currency: "USD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pricing-tab">
      <h3 className="mb-4">Course Pricing</h3>

      <form>
        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label htmlFor="discount" className="form-label fw-semibold">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="form-control"
            placeholder="Enter discount percentage"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        {/* Currency */}
        <div className="mb-3">
          <label htmlFor="currency" className="form-label fw-semibold">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="form-select"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Pricing;
