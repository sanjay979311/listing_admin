import React, { useState } from "react";

const Basic = () => {
  const [formData, setFormData] = useState({
    courseType: "",
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    subCategory: "",
    level: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="basic-tab">
      <h3 className="mb-4">Basic Course Information</h3>
      <form>
        {/* Course Type */}
        <div className="mb-3">
          <label htmlFor="courseType" className="form-label fw-semibold">
            Course Type
          </label>
          <select
            id="courseType"
            name="courseType"
            className="form-select"
            value={formData.courseType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="general">General</option>
            <option value="specialized">Specialized</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Course Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Course Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter course title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label htmlFor="shortDescription" className="form-label fw-semibold">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows="2"
            className="form-control"
            placeholder="Enter a short description"
            value={formData.shortDescription}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Full Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            className="form-control"
            placeholder="Write detailed course description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-semibold">
            Category <span className="text-danger">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label htmlFor="subCategory" className="form-label fw-semibold">
            Sub Category
          </label>
          <select
            id="subCategory"
            name="subCategory"
            className="form-select"
            value={formData.subCategory}
            onChange={handleChange}
          >
            <option value="">Select sub category</option>
            {formData.category === "development" && (
              <>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
              </>
            )}
            {formData.category === "design" && (
              <>
                <option value="uiux">UI/UX Design</option>
                <option value="graphic">Graphic Design</option>
              </>
            )}
            {formData.category === "marketing" && (
              <>
                <option value="seo">SEO</option>
                <option value="digital">Digital Marketing</option>
              </>
            )}
            {formData.category === "business" && (
              <>
                <option value="management">Management</option>
                <option value="entrepreneurship">Entrepreneurship</option>
              </>
            )}
          </select>
        </div>

        {/* Level */}
        <div className="mb-3">
          <label htmlFor="level" className="form-label fw-semibold">
            Level
          </label>
          <select
            id="level"
            name="level"
            className="form-select"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-3">
          <label htmlFor="language" className="form-label fw-semibold">
            Language Made In
          </label>
          <input
            type="text"
            id="language"
            name="language"
            className="form-control"
            placeholder="e.g., English, Hindi, French"
            value={formData.language}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Basic;


