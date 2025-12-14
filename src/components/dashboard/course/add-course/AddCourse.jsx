


// import React, { useState } from "react";
// import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../../store/features/category/categoryApi";
// const AddCourse = () => {
//   const tabs = ["basic", "info", "pricing", "media", "seo", "finish"];
//   const [activeTab, setActiveTab] = useState("basic");

//   // Sample categories and subcategories
//   const categoryOptions = {
//     "Programming": ["JavaScript", "Python", "Java", "C++"],
//     "Design": ["UI/UX", "Graphic Design", "Web Design"],
//     "Marketing": ["SEO", "Social Media", "Email Marketing"],
//   };

//   const [formData, setFormData] = useState({
//     category: "",
//     subcategory: "",
//     title: "",
//     description: "",
//     info: "",
//     price: "",
//     media: null,
//     seoTitle: "",
//     seoDescription: "",
//   });

//   const [mediaPreview, setMediaPreview] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e) => {
//     setFormData({ ...formData, category: e.target.value, subcategory: "" });
//   };

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, media: file });
//       setMediaPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleNext = () => {
//     const currentIndex = tabs.indexOf(activeTab);
//     if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
//   };

//   const handleBack = () => {
//     const currentIndex = tabs.indexOf(activeTab);
//     if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Course Data:", formData);
//     alert("Check console for submitted course data!");
//   };

//   return (
//     <div className="container-fluid mt-4">
//       <div className="col-xl-12">
//         <div className="card box mb-3">
//           <div className="card-body box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
//             <h4 className="page-title mb-0 d-flex align-items-center gap-2">
//               <i className="mdi mdi-book-plus title_icon"></i> Add Course
//             </h4>
//           </div>
//         </div>
//       </div>

//       <div className="row row-cols-1 g-3 g-md-5">
//         <div className="col">
//           <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
//             {/* Tabs */}
//             <ul className="nav nav-pills nav-justified form-wizard-header mb-5" role="tablist">
//               {tabs.map((tab) => (
//                 <li className="nav-item" key={tab}>
//                   <button
//                     className={`nav-link rounded-0 pt-2 pb-2 ${activeTab === tab ? "active" : ""}`}
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <form onSubmit={handleSubmit}>
//               {/* BASIC TAB */}
//               {activeTab === "basic" && (
//                 <div>
//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">Category<span className="required">*</span></label>
//                     <div className="col-md-9">
//                       <select
//                         className="form-select"
//                         name="category"
//                         value={formData.category}
//                         onChange={handleCategoryChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {Object.keys(categoryOptions).map((cat) => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">Subcategory</label>
//                     <div className="col-md-9">
//                       <select
//                         className="form-select"
//                         name="subcategory"
//                         value={formData.subcategory}
//                         onChange={handleChange}
//                         disabled={!formData.category}
//                       >
//                         <option value="">Select Subcategory</option>
//                         {formData.category && categoryOptions[formData.category].map((sub) => (
//                           <option key={sub} value={sub}>{sub}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">Course Title<span className="required">*</span></label>
//                     <div className="col-md-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">Description</label>
//                     <div className="col-md-9">
//                       <textarea
//                         className="form-control"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         placeholder="Enter course description"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* INFO TAB */}
//               {activeTab === "info" && (
//                 <div className="form-group row mb-3">
//                   <label className="col-md-3 col-form-label">Additional Info</label>
//                   <div className="col-md-9">
//                     <textarea
//                       className="form-control"
//                       name="info"
//                       value={formData.info}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Enter additional course info"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* PRICING TAB */}
//               {activeTab === "pricing" && (
//                 <div className="form-group row mb-3">
//                   <label className="col-md-3 col-form-label">Price</label>
//                   <div className="col-md-9">
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       placeholder="Enter course price"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* MEDIA TAB */}
//               {activeTab === "media" && (
//                 <div className="form-group row mb-3">
//                   <label className="col-md-3 col-form-label">Course Media</label>
//                   <div className="col-md-9">
//                     <input type="file" className="form-control" onChange={handleMediaChange} />
//                     {mediaPreview && (
//                       <div className="mt-3">
//                         <img
//                           src={mediaPreview}
//                           alt="Preview"
//                           className="img-thumbnail"
//                           style={{ width: "150px", height: "150px", objectFit: "cover" }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* SEO TAB */}
//               {activeTab === "seo" && (
//                 <div>
//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">SEO Title</label>
//                     <div className="col-md-9">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="seoTitle"
//                         value={formData.seoTitle}
//                         onChange={handleChange}
//                         placeholder="Enter SEO title"
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group row mb-3">
//                     <label className="col-md-3 col-form-label">SEO Description</label>
//                     <div className="col-md-9">
//                       <textarea
//                         className="form-control"
//                         name="seoDescription"
//                         value={formData.seoDescription}
//                         onChange={handleChange}
//                         rows="3"
//                         placeholder="Enter SEO description"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* FINISH TAB */}
//               {activeTab === "finish" && (
//                 <div>
//                   <h5 className="mb-3">Review Course Details</h5>
//                   <ul className="list-group mb-3">
//                     <li className="list-group-item"><strong>Category:</strong> {formData.category}</li>
//                     <li className="list-group-item"><strong>Subcategory:</strong> {formData.subcategory}</li>
//                     <li className="list-group-item"><strong>Title:</strong> {formData.title}</li>
//                     <li className="list-group-item"><strong>Description:</strong> {formData.description}</li>
//                     <li className="list-group-item"><strong>Additional Info:</strong> {formData.info}</li>
//                     <li className="list-group-item"><strong>Price:</strong> {formData.price}</li>
//                     <li className="list-group-item"><strong>SEO Title:</strong> {formData.seoTitle}</li>
//                     <li className="list-group-item"><strong>SEO Description:</strong> {formData.seoDescription}</li>
//                     {mediaPreview && (
//                       <li className="list-group-item">
//                         <strong>Media Preview:</strong><br />
//                         <img
//                           src={mediaPreview}
//                           alt="Preview"
//                           className="img-thumbnail mt-2"
//                           style={{ width: "150px", height: "150px", objectFit: "cover" }}
//                         />
//                       </li>
//                     )}
//                   </ul>
//                   <div className="text-center">
//                     <button type="submit" className="btn btn-success">
//                       Add Course
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Buttons */}
//               <div className="d-flex justify-content-between mt-4">
//                 {activeTab !== "basic" && (
//                   <button type="button" className="btn btn-secondary" onClick={handleBack}>
//                     Back
//                   </button>
//                 )}
//                 {activeTab !== "finish" && (
//                   <button type="button" className="btn btn-primary ms-auto" onClick={handleNext}>
//                     Next
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;



import React, { useState } from "react";
import { useGetCategoryQuery, useGetSubCategoryByCatIdQuery } from "../../../../store/features/category/categoryApi";
const AddCourse = () => {


  const tabs = ["basic", "info", "pricing", "media", "seo", "finish"];
  const [activeTab, setActiveTab] = useState("basic");



  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    info: "",
    price: "",
    media: null,
    seoTitle: "",
    seoDescription: "",
  });

  const { data: categories, isLoading, error, refetch } = useGetCategoryQuery();
  const { data: subCategory } = useGetSubCategoryByCatIdQuery(formData.category)


  console.log("subCategory ==========>", subCategory)

  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    console.log("category id is ==========>", e.target.value)
    setFormData({ ...formData, category: e.target.value, subcategory: "" });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, media: file });
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", formData);
    alert("Check console for submitted course data!");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="col-xl-12">
        <div className="card box mb-3">
          <div className="card-body box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="page-title mb-0 d-flex align-items-center gap-2">
              <i className="mdi mdi-book-plus title_icon"></i> Add Course
            </h4>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            {/* Tabs */}
            <ul className="nav nav-pills nav-justified form-wizard-header mb-5" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link rounded-0 pt-2 pb-2 ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              {/* BASIC TAB */}
              {activeTab === "basic" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Category<span className="required">*</span></label>
                    <div className="col-md-9">
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories?.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>


                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Subcategory</label>
                    <div className="col-md-9">
                      <select
                        className="form-select"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        disabled={!formData.category}
                      >
                        <option value="">Select Subcategory</option>
                        {subCategory && subCategory.length > 0 ? (
                          subCategory.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                              {sub.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No Subcategory Found
                          </option>
                        )}
                      </select>
                    </div>
                  </div>


                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Course Title<span className="required">*</span></label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">Description</label>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter course description"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* INFO TAB */}
              {activeTab === "info" && (
                <div className="form-group row mb-3">
                  <label className="col-md-3 col-form-label">Additional Info</label>
                  <div className="col-md-9">
                    <textarea
                      className="form-control"
                      name="info"
                      value={formData.info}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Enter additional course info"
                    />
                  </div>
                </div>
              )}

              {/* PRICING TAB */}
              {activeTab === "pricing" && (
                <div className="form-group row mb-3">
                  <label className="col-md-3 col-form-label">Price</label>
                  <div className="col-md-9">
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter course price"
                    />
                  </div>
                </div>
              )}

              {/* MEDIA TAB */}
              {activeTab === "media" && (
                <div className="form-group row mb-3">
                  <label className="col-md-3 col-form-label">Course Media</label>
                  <div className="col-md-9">
                    <input type="file" className="form-control" onChange={handleMediaChange} />
                    {mediaPreview && (
                      <div className="mt-3">
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="img-thumbnail"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SEO TAB */}
              {activeTab === "seo" && (
                <div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">SEO Title</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleChange}
                        placeholder="Enter SEO title"
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-md-3 col-form-label">SEO Description</label>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter SEO description"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* FINISH TAB */}
              {activeTab === "finish" && (
                <div>
                  <h5 className="mb-3">Review Course Details</h5>
                  <ul className="list-group mb-3">
                    <li className="list-group-item"><strong>Category:</strong> {formData.category}</li>
                    <li className="list-group-item"><strong>Subcategory:</strong> {formData.subcategory}</li>
                    <li className="list-group-item"><strong>Title:</strong> {formData.title}</li>
                    <li className="list-group-item"><strong>Description:</strong> {formData.description}</li>
                    <li className="list-group-item"><strong>Additional Info:</strong> {formData.info}</li>
                    <li className="list-group-item"><strong>Price:</strong> {formData.price}</li>
                    <li className="list-group-item"><strong>SEO Title:</strong> {formData.seoTitle}</li>
                    <li className="list-group-item"><strong>SEO Description:</strong> {formData.seoDescription}</li>
                    {mediaPreview && (
                      <li className="list-group-item">
                        <strong>Media Preview:</strong><br />
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="img-thumbnail mt-2"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                      </li>
                    )}
                  </ul>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Add Course
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                {activeTab !== "basic" && (
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    Back
                  </button>
                )}
                {activeTab !== "finish" && (
                  <button type="button" className="btn btn-primary ms-auto" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

