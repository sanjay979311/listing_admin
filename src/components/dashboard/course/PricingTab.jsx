const PricingTab = ({ data, onChange }) => {
  return (
    <>
      <label className="form-label">Price</label>
      <input
        type="number"
        className="form-control mb-3"
        value={data.price || ""}
        onChange={(e) => onChange({ price: e.target.value })}
        placeholder="Enter price"
      />

      <label className="form-label">Discount (%)</label>
      <input
        type="number"
        className="form-control mb-3"
        value={data.discount || ""}
        onChange={(e) => onChange({ discount: e.target.value })}
        placeholder="Enter discount percentage"
      />

      <label className="form-label">Currency</label>
      <select
        className="form-select mb-3"
        value={data.currency || "USD"}
        onChange={(e) => onChange({ currency: e.target.value })}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </>
  );
};

export default PricingTab;
