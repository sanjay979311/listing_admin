

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { updateSubCategory, fetchSubCategories, resetUpdateStatus } from '../../../store/reducers/subCategoryReducer';
// import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const EditSubCategory = () => {
//     const { id } = useParams(); // Get the `id` from the URL
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items, updateStatus, error } = useSelector(state => state.subCategories);
//     const [name, setName] = useState('');
//     const [category, setCategory] = useState('');
//     const [categoryError, setCategoryError] = useState(''); // State for category validation error

//     // Fetch categories
//     const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();

//     // Fetch sub-categories if not already loaded
//     useEffect(() => {
//         if (items.length === 0) {
//             dispatch(fetchSubCategories());
//         }
//     }, [dispatch, items.length]);

//     // Pre-fill the form with the sub-category data
//     useEffect(() => {
//         if (items.length > 0) {
//             const subCategory = items.find(item => item._id === id);
//             if (subCategory) {
//                 setName(subCategory.name);
//                 setCategory(subCategory.category); // Pre-select the current category
//             }
//         }
//     }, [items, id]);

//     // Show toast messages based on updateStatus
//     useEffect(() => {
//         if (updateStatus === 'succeeded') {
//             toast.success('Sub-category updated successfully!');
//             dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
//             setTimeout(() => {
//                 navigate('/dashboard/sub-category-list');
//             }, 1000); // Navigate back to the list page
//         } else if (updateStatus === 'failed') {
//             toast.error(error || 'Failed to update sub-category!');
//             dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
//         }
//     }, [updateStatus, dispatch, navigate, error]);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate input fields
//         if (!name || !category) {
//             setCategoryError('Please select a category');
//             return toast.error('Name and category are required');
//         }

//         // Create the formData object
//         const formData = {
//             name,
//             category,
//         };

//         console.log("Update sub-category payload =====>", { id, formData });

//         try {
//             // Pass `id` and `formData` to the action
//             await dispatch(updateSubCategory({ id, formData })).unwrap();
//         } catch (error) {
//             console.error('Failed to update sub-category:', error);
//             toast.error(error || 'Failed to update sub-category!');
//         }
//     };

//     return (
//         <div className="container">
//             <ToastContainer />
//             <h5 className="mb-4">Edit Sub Category</h5>
//             <form onSubmit={handleSubmit}>
//                 <div className="row row-cols-1">
//                     {/* Category Selection */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Category</h6>
//                                         <p className="text-secondary">
//                                             Select the parent category for the sub-category
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Category *</label>
//                                                     <select
//                                                         className={`form-control ${categoryError ? 'is-invalid' : ''}`}
//                                                         value={category}
//                                                         onChange={(e) => {
//                                                             setCategory(e.target.value);
//                                                             setCategoryError(''); // Clear error on change
//                                                         }}
//                                                         required
//                                                     >
//                                                         <option value="">Select Category</option>
//                                                         {categoryList?.map((cat) => (
//                                                             <option key={cat._id} value={cat._id}>
//                                                                 {cat.name}
//                                                             </option>
//                                                         ))}
//                                                     </select>
//                                                     {categoryError && (
//                                                         <div className="invalid-feedback">{categoryError}</div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Sub-Category Name */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Sub Category</h6>
//                                         <p className="text-secondary">
//                                             Edit the name of the sub-category
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Sub Category Name *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Name"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="col sticky-bottom">
//                         <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
//                             <div className="row">
//                                 <div className="col-auto">
//                                     <button
//                                         type="button"
//                                         className="btn btn-outline-primary btn-lg fw-semibold"
//                                         onClick={() => navigate(-1)} // Go back to the previous page
//                                     >
//                                         Back
//                                     </button>
//                                 </div>
//                                 <div className="col-auto ms-auto">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary btn-lg fw-semibold"
//                                         disabled={updateStatus === 'loading'}
//                                     >
//                                         {updateStatus === 'loading' ? 'Updating...' : 'Submit'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default EditSubCategory;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateSubCategory,
  fetchSubCategories,
  resetUpdateStatus,
} from "../../../store/reducers/subCategoryReducer";
import { useGetCategoryQuery } from "../../../store/features/category/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../utils/imageConfig";

const EditSubCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, updateStatus, error } = useSelector(
    (state) => state.subCategories
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [prevImg, setPrevImg] = useState(null);
  const [categoryError, setCategoryError] = useState("");

  // ✅ Fetch categories
  const {
    data: categoryList,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetCategoryQuery();

  // ✅ Fetch sub-categories if not already loaded
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchSubCategories());
    }
  }, [dispatch, items.length]);

  // ✅ Pre-fill the form
  useEffect(() => {
    if (items.length > 0) {
      const subCategory = items.find((item) => item._id === id);
      if (subCategory) {
        setName(subCategory.name);
        setCategory(subCategory.category?._id || subCategory.category);
        if (subCategory.image) {
          setPrevImg(`${BASE_URL}${subCategory.image}`);
          setImage(subCategory.image);
        }
      }
    }
  }, [items, id]);

  // ✅ Toast messages
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Sub-category updated successfully!");
      dispatch(resetUpdateStatus());
      setTimeout(() => navigate("/dashboard/sub-category-list"), 1000);
    } else if (updateStatus === "failed") {
      toast.error(error || "Failed to update sub-category!");
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, error, navigate, dispatch]);

  // ✅ Handle Image Selection
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPrevImg(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPrevImg(null);
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) {
      setCategoryError("Please select a category");
      return toast.error("Name and category are required");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image && image instanceof File) formData.append("image", image);

    try {
      await dispatch(updateSubCategory({ id, formData })).unwrap();
    } catch (error) {
      console.error("Failed to update sub-category:", error);
      toast.error(error || "Failed to update sub-category!");
    }
  };

  if (isCategoryLoading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <div className="container">
      <ToastContainer />
      <h5 className="mb-4">Edit Sub Category</h5>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row row-cols-1">
          {/* ✅ Image Upload */}
          <div className="col">
            <div className="py-4 border-top">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div>
                    <h6>Featured Image</h6>
                    <p className="text-secondary">
                      Upload your image here <br /> Image size should not be
                      more than 2 MB
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card border-0 p-3 shadow-sm">
                    <div className="card-body">
                      <label className="w-100">
                        <div
                          className="border border-2 text-center p-3"
                          style={{
                            "--bs-border-style": "dashed",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            className="text-body-tertiary m-3"
                            xmlns="http://www.w3.org/2000/svg"
                            width="41px"
                            height="30px"
                            viewBox="0 0 40.909 30"
                          >
                            <g transform="translate(0 -73.091)">
                              <path
                                d="M39.129,89.827A8.064,8.064,0,0,0,34.58,86.94,5.446,5.446,0,0,0,30,78.546a5.207,5.207,0,0,0-3.537,1.321,10.921,10.921,0,0,0-10.1-6.776,10.511,10.511,0,0,0-7.713,3.2A10.508,10.508,0,0,0,5.454,84q0,.277.043.916A9.528,9.528,0,0,0,0,93.546a9.193,9.193,0,0,0,2.8,6.743,9.191,9.191,0,0,0,6.744,2.8H32.728a8.172,8.172,0,0,0,6.4-13.264ZM27.07,89.252H21.818v7.5a.691.691,0,0,1-.681.681H17.045a.691.691,0,0,1-.682-.681v-7.5H11.59a.655.655,0,0,1-.681-.681.8.8,0,0,1,.213-.512L18.6,80.783a.722.722,0,0,1,.98,0l7.5,7.5a.663.663,0,0,1,.191.49A.656.656,0,0,1,27.07,89.252Z"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                          <p style={{ fontSize: "14px" }}>
                            <span className="text-color-1 fw-medium">
                              Upload an image
                            </span>{" "}
                            or drag and drop <br /> PNG, JPG
                          </p>
                          <input
                            className="form-control"
                            type="file"
                            hidden
                            onChange={handleImageChange}
                          />
                        </div>
                      </label>
                      {prevImg && (
                        <div className="mt-3">
                          <img
                            src={prevImg}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="btn btn-outline-primary btn-sm ms-2"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Category Select */}
          <div className="col">
            <div className="py-4 border-top">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div>
                    <h6>Category</h6>
                    <p className="text-secondary">
                      Select the parent category for this sub-category
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card border-0 p-3 shadow-sm">
                    <div className="card-body">
                      <label className="form-label fw-medium">
                        Product Category *
                      </label>
                      <select
                        className={`form-control ${
                          categoryError ? "is-invalid" : ""
                        }`}
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setCategoryError("");
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        {categoryList?.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {categoryError && (
                        <div className="invalid-feedback">{categoryError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Subcategory Name */}
          <div className="col">
            <div className="py-4 border-top">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div>
                    <h6>Sub Category</h6>
                    <p className="text-secondary">
                      Edit the name of the sub-category
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card border-0 p-3 shadow-sm">
                    <div className="card-body">
                      <label className="form-label fw-medium">
                        Sub Category Name *
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Submit Button */}
          <div className="col sticky-bottom">
            <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
              <div className="row">
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg fw-semibold"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
                <div className="col-auto ms-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-semibold"
                    disabled={updateStatus === "loading"}
                  >
                    {updateStatus === "loading" ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
