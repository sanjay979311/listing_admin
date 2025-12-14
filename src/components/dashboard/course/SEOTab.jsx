const SeoTab = ({ data, onChange }) => {
  return (
    <>
      <label className="form-label">SEO Title</label>
      <input
        type="text"
        className="form-control mb-3"
        value={data.seoTitle || ""}
        onChange={(e) => onChange({ seoTitle: e.target.value })}
        placeholder="Enter SEO Title"
      />

      <label className="form-label">Keywords</label>
      <input
        type="text"
        className="form-control mb-3"
        value={data.keywords || ""}
        onChange={(e) => onChange({ keywords: e.target.value })}
        placeholder="Enter Keywords"
      />
    </>
  );
};

export default SeoTab;
