


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form, Button, Spinner, Container, Card, Alert } from "react-bootstrap";
// import { useAddCityMutation } from "../../../../store/features/location/city/cityApi";
// import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";
// import { useGetStateByCountryIdQuery } from "../../../../store/features/location/state/stateApi";
// import { FaCity, FaGlobeAmericas, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

// const AddCity = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         country: "",
//         state: ""
//     });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     // API Hooks
//     const [addCity, { isLoading: isAdding, error }] = useAddCityMutation();
//     const { data: countries, isLoading: isCountriesLoading, isError: isCountriesError } = useGetCountryQuery();
//     const {
//         data: states,
//         isLoading: isStatesLoading,
//         isError: isStatesError,
//     } = useGetStateByCountryIdQuery(formData.country, {
//         skip: !formData.country, // Skip query if no country is selected
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         // Reset state when country changes
//         if (name === "country") {
//             setFormData({
//                 name: formData.name,
//                 country: value,
//                 state: "" // Reset state selection
//             });
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }

//         // Clear error when field changes
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ""
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = "City name is required";
//         if (!formData.country) newErrors.country = "Please select a country";
//         if (!formData.state) newErrors.state = "Please select a state";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) return;

//         try {
//             await addCity(formData).unwrap();
//             toast.success("City added successfully!");
//             setTimeout(() => navigate("/dashboard/city-list"), 1000);
//         } catch (err) {
//             toast.error(err?.data?.message || "Failed to add city. Please try again.");
//             console.error("Add city error:", err);
//         }
//     };

//     const hasStates = states && states.length > 0;
//     const showNoStatesMessage = formData.country && !isStatesLoading && !hasStates;

//     return (
//         <Container className="py-4">
//             <ToastContainer position="top-right" autoClose={3000} />
//             <Card className="border-0 shadow">
//                 <Card.Header className="bg-white border-0 py-3">
//                     <div className="d-flex align-items-center">
//                         <Button
//                             variant="outline-secondary"
//                             onClick={() => navigate(-1)}
//                             size="sm"
//                             className="me-3"
//                         >
//                             <FaArrowLeft />
//                         </Button>
//                         <h5 className="mb-0 d-flex align-items-center">
//                             <FaCity className="me-2 text-primary" />
//                             Add New City
//                         </h5>
//                     </div>
//                 </Card.Header>
//                 <Card.Body>
//                     <Form onSubmit={handleSubmit}>
//                         {/* City Name Field */}
//                         <Form.Group className="mb-4">
//                             <Form.Label className="fw-semibold">
//                                 <FaMapMarkerAlt className="me-2 text-muted" />
//                                 City Name *
//                             </Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="name"
//                                 placeholder="Enter city name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 isInvalid={!!errors.name}
//                                 disabled={isAdding}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.name}
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         {/* Country Selection */}
//                         <Form.Group className="mb-4">
//                             <Form.Label className="fw-semibold">
//                                 <FaGlobeAmericas className="me-2 text-muted" />
//                                 Country *
//                             </Form.Label>
//                             <Form.Select
//                                 name="country"
//                                 value={formData.country}
//                                 onChange={handleChange}
//                                 isInvalid={!!errors.country}
//                                 disabled={isAdding || isCountriesLoading}
//                             >
//                                 <option value="">Select a country</option>
//                                 {countries?.map((country) => (
//                                     <option key={country._id} value={country._id}>
//                                         {country.name}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.country}
//                             </Form.Control.Feedback>
//                             {isCountriesError && (
//                                 <Alert variant="danger" className="mt-2">
//                                     Failed to load countries. Please try again.
//                                 </Alert>
//                             )}
//                         </Form.Group>

//                         {/* State Selection - Only shown when country is selected */}
//                         {formData.country && (
//                             <Form.Group className="mb-4">
//                                 <Form.Label className="fw-semibold">
//                                     <FaMapMarkerAlt className="me-2 text-muted" />
//                                     State *
//                                 </Form.Label>
//                                 {isStatesLoading ? (
//                                     <div className="d-flex align-items-center">
//                                         <Spinner size="sm" className="me-2" />
//                                         Loading states...
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <Form.Select
//                                             name="state"
//                                             value={formData.state}
//                                             onChange={handleChange}
//                                             isInvalid={!!errors.state}
//                                             disabled={isAdding || !hasStates}
//                                         >
//                                             <option value="">
//                                                 {hasStates ? "Select a state" : "No states available"}
//                                             </option>
//                                             {states?.map((state) => (
//                                                 <option key={state._id} value={state._id}>
//                                                     {state.name}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>
//                                         <Form.Control.Feedback type="invalid">
//                                             {errors.state}
//                                         </Form.Control.Feedback>
//                                         {showNoStatesMessage && (
//                                             <Alert variant="warning" className="mt-2">
//                                                 No states available for the selected country.
//                                             </Alert>
//                                         )}
//                                         {isStatesError && (
//                                             <Alert variant="danger" className="mt-2">
//                                                 Failed to load states. Please try again.
//                                             </Alert>
//                                         )}
//                                     </>
//                                 )}
//                             </Form.Group>
//                         )}

//                         {/* API Error Display */}
//                         {error && (
//                             <Alert variant="danger" className="mb-4">
//                                 {error?.data?.message || "An error occurred while adding the city"}
//                             </Alert>
//                         )}

//                         {/* Form Actions */}
//                         <div className="d-flex justify-content-between border-top pt-4">
//                             <Button
//                                 variant="outline-secondary"
//                                 onClick={() => navigate("/dashboard/city-list")}
//                                 disabled={isAdding}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 variant="primary"
//                                 type="submit"
//                                 disabled={isAdding || !formData.country || !formData.state}
//                             >
//                                 {isAdding ? (
//                                     <>
//                                         <Spinner
//                                             as="span"
//                                             animation="border"
//                                             size="sm"
//                                             className="me-2"
//                                         />
//                                         Adding...
//                                     </>
//                                 ) : "Add City"}
//                             </Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default AddCity;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card, Alert } from "react-bootstrap";
import { FaCity, FaGlobeAmericas, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { useAddCityMutation } from "../../../../store/features/location/city/cityApi";
import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";
import { useGetStateByCountryIdQuery } from "../../../../store/features/location/state/stateApi";

const AddCity = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    state: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // RTK Query Hooks
  const [addCity, { isLoading: isAdding, error }] = useAddCityMutation();
  const { data: countries, isLoading: isCountriesLoading } = useGetCountryQuery();
  const { data: states, isLoading: isStatesLoading } = useGetStateByCountryIdQuery(formData.country, {
    skip: !formData.country,
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setFormData({ ...formData, country: value, state: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "City name(s) are required";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.state) newErrors.state = "Please select a state";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Split multiple cities by comma or new line
    const cityNames = formData.name
      .split(/[,|\n]/)
      .map((c) => c.trim())
      .filter(Boolean);

    if (cityNames.length === 0) {
      setErrors({ name: "Please enter at least one valid city name" });
      return;
    }

    const payload = {
      cities: cityNames.map((name) => ({
        name,
        country: formData.country,
        state: formData.state,
      })),
    };

    try {
      await addCity(payload).unwrap();
      toast.success(`${cityNames.length} city${cityNames.length > 1 ? "ies" : ""} added successfully!`);
      setTimeout(() => navigate("/dashboard/city-list"), 1200);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add cities. Please try again.");
      console.error("Add multiple cities error:", err);
    }
  };

  const hasStates = states && states.length > 0;

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
              <FaCity className="me-2 text-primary" />
              Add Multiple Cities
            </h5>
          </div>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
           

            {/* Country Dropdown */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaGlobeAmericas className="me-2 text-muted" /> Country *
              </Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
                disabled={isAdding || isCountriesLoading}
              >
                <option value="">Select a country</option>
                {countries?.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            {/* State Dropdown */}
            {formData.country && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  <FaMapMarkerAlt className="me-2 text-muted" /> State *
                </Form.Label>
                {isStatesLoading ? (
                  <div className="d-flex align-items-center">
                    <Spinner size="sm" className="me-2" /> Loading states...
                  </div>
                ) : (
                  <Form.Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                    disabled={isAdding || !hasStates}
                  >
                    <option value="">
                      {hasStates ? "Select a state" : "No states available"}
                    </option>
                    {states?.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            )}

             {/* City Input */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaMapMarkerAlt className="me-2 text-muted" /> City Names *
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="name"
                placeholder="Enter multiple city names separated by commas or new lines (e.g., Paris, Lyon, Marseille)"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                disabled={isAdding}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                You can separate city names using commas or line breaks.
              </Form.Text>
            </Form.Group>

            {/* API Error */}
            {error && (
              <Alert variant="danger" className="mb-4">
                {error?.data?.message || "An error occurred while adding cities"}
              </Alert>
            )}

            {/* Buttons */}
            <div className="d-flex justify-content-between border-top pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/dashboard/city-list")}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isAdding || !formData.country || !formData.state}
              >
                {isAdding ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Adding...
                  </>
                ) : (
                  "Add Cities"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddCity;
