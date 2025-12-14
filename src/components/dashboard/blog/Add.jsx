// import React, { useState } from "react";

// const AddBlog = () => {
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [status, setStatus] = useState("draft");
//   const [featuredImage, setFeaturedImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFeaturedImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setFeaturedImage(null);
//     setPreviewImage(null);
//   };

//   const handleTagKeyDown = (e) => {
//     if (e.key === "Enter" && tagInput.trim()) {
//       e.preventDefault();
//       if (!tags.includes(tagInput.trim())) {
//         setTags([...tags, tagInput.trim()]);
//       }
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newBlog = {
//       category,
//       subCategory,
//       title,
//       description,
//       metaTitle,
//       metaDescription,
//       tags,
//       status,
//       featuredImage,
//     };
//     console.log("Blog Added:", newBlog);
//     alert("Blog added successfully!");
//     // Reset form
//     setCategory("");
//     setSubCategory("");
//     setTitle("");
//     setDescription("");
//     setMetaTitle("");
//     setMetaDescription("");
//     setTags([]);
//     setTagInput("");
//     setStatus("draft");
//     setFeaturedImage(null);
//     setPreviewImage(null);
//   };

//   return (
//     <div className="mt-3 border rounded bg-light p-3">
//       <h6 className="fw-semibold mb-3">Add New Blog</h6>
//       <form onSubmit={handleSubmit}>
//         <div className="row g-3">
//           {/* Category */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Category</label>
//             <select
//               className="form-control"
//               required
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">--Select Category--</option>
//               <option value="programming">Programming</option>
//               <option value="design">Design</option>
//               <option value="marketing">Marketing</option>
//             </select>
//           </div>

//           {/* Subcategory */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Subcategory</label>
//             <select
//               className="form-control"
//               required
//               value={subCategory}
//               onChange={(e) => setSubCategory(e.target.value)}
//             >
//               <option value="">--Select Subcategory--</option>
//               <option value="frontend">Frontend</option>
//               <option value="backend">Backend</option>
//               <option value="uiux">UI/UX</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div className="col-md-12">
//             <label className="form-label fw-semibold small">Blog Title</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter blog title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="col-md-12">
//             <label className="form-label fw-semibold small">Blog Description</label>
//             <textarea
//               className="form-control"
//               rows="6"
//               placeholder="Enter blog content"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>

//           {/* Meta Title */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Meta Title</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter meta title"
//               value={metaTitle}
//               onChange={(e) => setMetaTitle(e.target.value)}
//             />
//           </div>

//           {/* Meta Description */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Meta Description</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter meta description"
//               value={metaDescription}
//               onChange={(e) => setMetaDescription(e.target.value)}
//             />
//           </div>

//           {/* Tags */}
//           <div className="col-md-12">
//             <label className="form-label fw-semibold small">Tags (press Enter to add)</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Type a tag and press Enter"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyDown={handleTagKeyDown}
//             />
//             <div className="mt-2">
//               {tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="badge bg-primary me-2 mb-2"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => removeTag(tag)}
//                 >
//                   #{tag} &times;
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Status */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Status</label>
//             <select
//               className="form-control"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//             </select>
//           </div>

//           {/* Featured Image */}
//           <div className="col-md-6">
//             <label className="form-label fw-semibold small">Featured Image</label>
//             <div className="d-flex align-items-center gap-2">
//               <label
//                 className="btn btn-outline-primary btn-sm mb-0"
//                 style={{ cursor: "pointer" }}
//               >
//                 Upload Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={handleImageChange}
//                 />
//               </label>
//               {previewImage && (
//                 <div className="position-relative">
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     style={{
//                       maxWidth: "150px",
//                       maxHeight: "100px",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd",
//                     }}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-danger btn-sm position-absolute top-0 end-0"
//                     style={{ borderRadius: "50%", padding: "0 6px" }}
//                     onClick={removeImage}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="d-flex gap-2 mt-3">
//           <button type="submit" className="btn btn-primary btn-sm">
//             Add Blog
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary btn-sm"
//             onClick={() => {
//               setCategory("");
//               setSubCategory("");
//               setTitle("");
//               setDescription("");
//               setMetaTitle("");
//               setMetaDescription("");
//               setTags([]);
//               setTagInput("");
//               setStatus("draft");
//               setFeaturedImage(null);
//               setPreviewImage(null);
//             }}
//           >
//             Clear
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBlog;


import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  const categories = ["Technology", "Health", "Travel", "Education", "Food"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("metaKeywords", metaKeywords);

    console.log({
      title,
      category,
      description,
      image,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    // Reset form
    setTitle("");
    setCategory("");
    setDescription("");
    setImage(null);
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="col-xl-12 mb-3">
        <div className="card box">
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="page-title mb-0 d-flex align-items-center gap-2">
              <i className="mdi mdi-apple-keyboard-command title_icon"></i> Add Blog
            </h4>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Write your blog content here..."
                  required
                />
              </div>

              {/* Image Upload Box */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <div className="border rounded p-3 text-center position-relative" style={{ cursor: "pointer" }}>
                  {image ? (
                    <div className="position-relative d-inline-block">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                        className="img-thumbnail"
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        style={{ borderRadius: "50%" }}
                        onClick={removeImage}
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>Click or Drag & Drop to upload image</p>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Title */}
              <div className="mb-3">
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>

              {/* Meta Description */}
              <div className="mb-3">
                <label className="form-label">Meta Description</label>
                <textarea
                  className="form-control"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Meta Keywords */}
              <div className="mb-3">
                <label className="form-label">Meta Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="Separate keywords with commas"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Add Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
