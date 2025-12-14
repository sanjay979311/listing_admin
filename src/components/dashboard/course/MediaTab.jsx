const MediaTab = ({ data, onChange }) => {
  return (
    <>
      <label className="form-label">Thumbnail URL</label>
      <input
        type="text"
        className="form-control mb-3"
        value={data.thumbnail || ""}
        onChange={(e) => onChange({ thumbnail: e.target.value })}
        placeholder="Enter thumbnail URL"
      />

      <label className="form-label">Promo Video URL</label>
      <input
        type="text"
        className="form-control mb-3"
        value={data.promoVideo || ""}
        onChange={(e) => onChange({ promoVideo: e.target.value })}
        placeholder="Enter promo video URL"
      />
      <input
        type="text"
        className="form-control mb-3"
        value={data.promoVideo || ""}
        onChange={(e) => onChange({ promoVideo: e.target.value })}
        placeholder="Meta Tags"
      />
    </>
  );
};

export default MediaTab;
