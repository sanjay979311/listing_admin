// const BasicTab = () => {
//   return (
//     <>
//       <label className="form-label">Course Type</label>
//       <select name="courseType" className="form-select mb-3">
//         <option value="General">General</option>
//         <option value="Special">Special</option>
//       </select>

//       <label className="form-label">Course Title *</label>
//       <input
//         type="text"
//         name="courseTitle"
//         className="form-control mb-3"
//         placeholder="Enter course title"
//       />

//       <label className="form-label">Short Description</label>
//       <textarea name="shortDescription" className="form-control mb-3" rows="2" />

//       <label className="form-label">Description</label>
//       <textarea name="description" className="form-control mb-3" rows="4" />

//       <label className="form-label">Category *</label>
//       <select name="category" className="form-select mb-3">
//         <option value="">Select a category</option>
//         <option value="Development">Development</option>
//         <option value="Design">Design</option>
//       </select>

//       <label className="form-label">Sub Category</label>
//       <select name="subCategory" className="form-select mb-3">
//         <option value="">Select sub category</option>
//         <option value="Web">Web</option>
//         <option value="Mobile">Mobile</option>
//       </select>

//       <label className="form-label">Level</label>
//       <select name="level" className="form-select mb-3">
//         <option value="Beginner">Beginner</option>
//         <option value="Intermediate">Intermediate</option>
//         <option value="Advanced">Advanced</option>
//       </select>

//       <label className="form-label">Language</label>
//       <select name="language" className="form-select mb-3">
//         <option value="English">English</option>
//         <option value="Hindi">Hindi</option>
//       </select>

//       <div className="form-check mb-3">
//         <input
//           className="form-check-input"
//           type="checkbox"
//           name="enableDripContent"
//         />
//         <label className="form-check-label">Enable drip content</label>
//       </div>

//       <label className="form-label">Create As</label>
//       <select name="createAs" className="form-select mb-3">
//         <option value="Active">Active Course</option>
//         <option value="Draft">Draft</option>
//       </select>
//     </>
//   );
// };

// export default BasicTab;


const BasicTab = ({ data, onChange }) => {
  return (
    <>
      <label className="form-label">Course Type</label>
      <select
        className="form-select mb-3"
        value={data.courseType || ""}
        onChange={(e) => onChange({ courseType: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="General">General</option>
        <option value="Special">Special</option>
      </select>

      <label className="form-label">Course Title *</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter course title"
        value={data.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />

      <label className="form-label">Short Description</label>
      <textarea
        className="form-control mb-3"
        rows="2"
        value={data.shortDesc || ""}
        onChange={(e) => onChange({ shortDesc: e.target.value })}
      />

      <label className="form-label">Description</label>
      <textarea
        className="form-control mb-3"
        rows="4"
        value={data.description || ""}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </>
  );
};

export default BasicTab;
