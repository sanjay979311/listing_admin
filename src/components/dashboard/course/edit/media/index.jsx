import React, { useState } from "react";

const Media = () => {
  const [formData, setFormData] = useState({
    provider: "youtube",
    overviewUrl: "",
    thumbnail: null,
    thumbnailPreview: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="media-tab">
      <h3 className="mb-4">Course Media</h3>

      <form>
        {/* Course Overview Provider */}
        <div className="mb-3">
          <label htmlFor="provider" className="form-label fw-semibold">
            Course Overview Provider
          </label>
          <select
            id="provider"
            name="provider"
            className="form-select"
            value={formData.provider}
            onChange={handleChange}
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="html5">HTML5 Video</option>
          </select>
        </div>

        {/* Course Overview URL */}
        <div className="mb-3">
          <label htmlFor="overviewUrl" className="form-label fw-semibold">
            Course Overview URL
          </label>
          <input
            type="url"
            id="overviewUrl"
            name="overviewUrl"
            className="form-control"
            placeholder="E.g: https://www.youtube.com/watch?v=oBtf8Yglw2w"
            value={formData.overviewUrl}
            onChange={handleChange}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label fw-semibold">
            Course Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Thumbnail Preview */}
        {formData.thumbnailPreview && (
          <div className="mt-3">
            <label className="form-label fw-semibold">Preview:</label>
            <div className="border rounded p-2 d-inline-block">
              <img
                src={formData.thumbnailPreview}
                alt="Course Thumbnail Preview"
                className="img-fluid rounded"
                style={{ maxWidth: "250px", height: "auto" }}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Media;
