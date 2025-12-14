


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card, Alert } from "react-bootstrap";
import { FaArrowLeft, FaGlobeAmericas, FaMapMarkerAlt, FaCity, FaFileAlt } from "react-icons/fa";

const SeoTemplate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    metaTitle: "Best courses in {city}, {state}",
    metaDescription: "Explore top courses in {area}, {city}, {state} and boost your skills today.",
    city: "Kolkata",
    state: "West Bengal",
    area: "Salt Lake",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.metaTitle.trim()) newErrors.metaTitle = "Meta title is required";
    if (!formData.metaDescription.trim()) newErrors.metaDescription = "Meta description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show the final form data in console
  console.log("SEO Template Form Data:", {
    metaTitle: parseTemplate(formData.metaTitle),
    metaDescription: parseTemplate(formData.metaDescription),
    city: formData.city,
    state: formData.state,
    area: formData.area
  });
    if (!validateForm()) return;

    // Simulate API call
    toast.success("SEO template saved successfully!");
  };

  const parseTemplate = (str) => {
    return str
      .replace("{city}", formData.city)
      .replace("{state}", formData.state)
      .replace("{area}", formData.area);
  };

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(-1)}
              size="sm"
              className="me-3"
            >
              <FaArrowLeft />
            </Button>
            <h5 className="mb-0 d-flex align-items-center">
              <FaFileAlt className="me-2 text-primary" />
              SEO Template
            </h5>
          </div>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Meta Title */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaFileAlt className="me-2 text-muted" /> Meta Title *
              </Form.Label>
              <Form.Control
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                isInvalid={!!errors.metaTitle}
              />
              <Form.Control.Feedback type="invalid">{errors.metaTitle}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                Use placeholders: {"{city}"}, {"{state}"}, {"{area}"}
              </Form.Text>
            </Form.Group>

            {/* Meta Description */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaFileAlt className="me-2 text-muted" /> Meta Description *
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                isInvalid={!!errors.metaDescription}
              />
              <Form.Control.Feedback type="invalid">{errors.metaDescription}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                Use placeholders: {"{city}"}, {"{state}"}, {"{area}"}
              </Form.Text>
            </Form.Group>

            {/* Preview */}
            <Card className="bg-light p-3 mb-4">
              <h6 className="fw-semibold">Preview</h6>
              <p>
                <strong>Meta Title:</strong> {parseTemplate(formData.metaTitle)}
              </p>
              <p>
                <strong>Meta Description:</strong> {parseTemplate(formData.metaDescription)}
              </p>
              <p>
                <strong>City:</strong> {formData.city}, <strong>State:</strong> {formData.state}, <strong>Area:</strong> {formData.area}
              </p>
            </Card>

            {/* Buttons */}
            <div className="d-flex justify-content-between border-top pt-4">
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Template
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SeoTemplate;
