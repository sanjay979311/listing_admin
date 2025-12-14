import React, { useState, useEffect } from "react";

const EditStudent = ({ studentData, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("basic_info");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    biography: "",
    phone: "",
    email: "",
    password: "",
    facebook: "",
    twitter: "",
    payment_method: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // Prefill form data when editing
  useEffect(() => {
    if (studentData) {
      setFormData({
        first_name: studentData.first_name || "",
        last_name: studentData.last_name || "",
        biography: studentData.biography || "",
        phone: studentData.phone || "",
        email: studentData.email || "",
        password: "", // leave empty for security
        facebook: studentData.facebook || "",
        twitter: studentData.twitter || "",
        payment_method: studentData.payment_method || "",
      });
      if (studentData.photo) {
        setPreview(studentData.photo); // URL of existing photo
      }
    }
  }, [studentData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, photo });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="col-xl-12">
        <div className="card box mb-3">
          <div className="card-body box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="page-title mb-0 d-flex align-items-center gap-2">
              <i className="mdi mdi-apple-keyboard-command title_icon"></i>
              Edit Student
            </h4>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">

            {/* Tab Header */}
            <ul className="nav nav-pills nav-justified form-wizard-header mb-5" role="tablist">
              {[
                { id: "basic_info", icon: "mdi-face-profile", label: "Basic Info" },
                { id: "login_credentials", icon: "mdi-lock", label: "Login Credentials" },
                { id: "social_information", icon: "mdi-wifi", label: "Social Information" },
                { id: "payment_info", icon: "mdi-currency-eur", label: "Payment Info" },
                { id: "finish", icon: "mdi-checkbox-marked-circle-outline", label: "Finish" },
              ].map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link rounded-0 pt-2 pb-2 ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={`mdi ${tab.icon} me-1`}></i>
                    <span className="d-none d-sm-inline">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <form onSubmit={handleSubmit}>
              {/* BASIC INFO */}
              {activeTab === "basic_info" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">First Name<span className="required">*</span></label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Last Name<span className="required">*</span></label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Biography</label>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                        name="biography"
                        value={formData.biography}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Write a short biography..."
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Phone</label>
                    <div className="col-md-9">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Profile Photo</label>
                    <div className="col-md-9">
                      <input type="file" className="form-control" onChange={handlePhotoChange} />
                      {preview && (
                        <div className="mt-3">
                          <img
                            src={preview}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                          />
                          <button type="button" className="btn btn-sm btn-danger ms-2" onClick={handleRemovePhoto}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LOGIN CREDENTIALS */}
              {activeTab === "login_credentials" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Email</label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Password</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL INFORMATION */}
              {activeTab === "social_information" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Facebook</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        placeholder="Facebook URL"
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Twitter</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="Twitter URL"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT INFO */}
              {activeTab === "payment_info" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Payment Method</label>
                    <div className="col-md-9">
                      <select
                        className="form-select"
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                      >
                        <option value="">Select Payment Method</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* FINISH TAB */}
              {activeTab === "finish" && (
                <div className="text-center py-4">
                  <h5>Review and Submit</h5>
                  <p>Click below to update the student details.</p>
                  <button type="submit" className="btn btn-success">
                    Update Student
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
