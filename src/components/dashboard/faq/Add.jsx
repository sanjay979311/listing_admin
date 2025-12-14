import React, { useState } from "react";

const AddFaq = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [course, setCourse] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqDescription, setFaqDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFaq = { category, subCategory, course, faqTitle, faqDescription };
    console.log("FAQ Added:", newFaq);

    // Reset form fields
    setCategory("");
    setSubCategory("");
    setCourse("");
    setFaqTitle("");
    setFaqDescription("");
  };

  return (
    <div className="mt-3 border rounded bg-light p-3">
      <h6 className="fw-semibold mb-3">Add New FAQ</h6>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Category Dropdown */}
          <div className="col-md-4">
            <label className="form-label fw-semibold small">Category</label>
            <select
              className="form-control"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">--Select Category--</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="col-md-4">
            <label className="form-label fw-semibold small">Subcategory</label>
            <select
              className="form-control"
              required
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">--Select Subcategory--</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="uiux">UI/UX</option>
            </select>
          </div>

          {/* Course Dropdown */}
          <div className="col-md-4">
            <label className="form-label fw-semibold small">Course</label>
            <select
              className="form-control"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">--Select Course--</option>
              <option value="react">React</option>
              <option value="nodejs">NodeJS</option>
              <option value="figma">Figma</option>
            </select>
          </div>

          {/* FAQ Title */}
          <div className="col-md-12">
            <label className="form-label fw-semibold small">FAQ Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter FAQ title"
              value={faqTitle}
              onChange={(e) => setFaqTitle(e.target.value)}
              required
            />
          </div>

          {/* FAQ Description */}
          <div className="col-md-12">
            <label className="form-label fw-semibold small">FAQ Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter FAQ description"
              value={faqDescription}
              onChange={(e) => setFaqDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary btn-sm">
            Add FAQ
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setCategory("");
              setSubCategory("");
              setCourse("");
              setFaqTitle("");
              setFaqDescription("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaq;
