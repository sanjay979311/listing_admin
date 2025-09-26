
import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const ChangePassword = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            const email = userInfo ? userInfo.email : "";
            if (!email) {
                toast.error("User email not found. Please log in again.", { autoClose: 5000 });
                return;
            }

            const payload = {
                email,
                old_password: formData.currentPassword,
                new_password: formData.newPassword,
            };

            // const response = await axios.post("http://localhost:5000/api/change-password", payload,{ withCredentials: true } );
            const response = await axios.post(
                `${BASE_URL}/api/change-password`,
                payload,
                { withCredentials: true }
            );

            // Show success toast message
            toast.success(response.data.message || "Password changed successfully!", { autoClose: 5000 });

            // Reset form
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setErrors({});
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password. Please try again.", { autoClose: 5000 });
        } finally {
            setLoading(false);
        }
    };

    // Form validation
    const validateForm = (data) => {
        const errors = {};

        if (!data.currentPassword) {
            errors.currentPassword = "Current password is required.";
        }

        if (!data.newPassword) {
            errors.newPassword = "New password is required.";
        } else if (data.newPassword.length < 4) {
            errors.newPassword = "New password must be at least 5 characters long.";
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm password is required.";
        } else if (data.confirmPassword !== data.newPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        return errors;
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Card style={{ width: "100%", maxWidth: "500px", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Change Password</h2>

                    <Form onSubmit={handleSubmit}>
                        {/* Current Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder="Enter current password"
                                isInvalid={!!errors.currentPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.currentPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* New Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder="Enter new password"
                                isInvalid={!!errors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.newPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm new password"
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ChangePassword;
