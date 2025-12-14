

// import { FaLayerGroup, FaPaperPlane } from "react-icons/fa";
// import { useGetStateQuery } from "../../../store/features/location/state/stateApi";


// const BulkPostAdsForm = () => {

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <div className="p-4">
//         <div className="card shadow-sm border-0">
//           <div className="card-header bg-gradient-primary text-white">
//             <h4 className="mb-0">
//               <FaLayerGroup className="me-2" /> Bulk Post Ads
//             </h4>
//           </div>

//           <div className="card-body p-4">
//             <form onSubmit={handleSubmit} encType="multipart/form-data">

//               {/* User */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Post As User *</label>
//                 <select name="user_id" className="form-select form-select-lg" required>
//                   <option value="">-- Select User --</option>
//                   <option value="1">John Doe (john@example.com)</option>
//                   <option value="2">Alice Smith (alice@example.com)</option>
//                   <option value="3">David Clark (david@example.com)</option>
//                 </select>
//               </div>

//               {/* Category */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Category *</label>
//                 <select name="category_id" className="form-select form-select-lg" required>
//                   <option value="">-- Select Category --</option>
//                   <option value="1">Real Estate</option>
//                   <option value="2">Services</option>
//                   <option value="3">Jobs</option>
//                   <option value="4">Electronics</option>
//                 </select>
//               </div>

//               {/* Title */}



//               <div className="mb-4">
//                 <label className="form-label fw-bold">Ad Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   className="form-control form-control-lg"
//                   placeholder="Best services in  {state} , {city}, {area}"
//                   required
//                 />
//               </div>


//               {/* Description */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Ad Description *</label>
//                 <textarea
//                   name="description"
//                   className="form-control"
//                   rows="5"
//                   placeholder="Describe your ad. Mention service details in {state}, {city},  {area}."
//                   required
//                 />
//               </div>


//               {/* Images */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Images (Max 5)</label>
//                 <input
//                   type="file"
//                   name="images"
//                   className="form-control"
//                   multiple
//                   accept="image/jpeg,image/png,image/webp"
//                 />
//               </div>

//               {/* Posting Level */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Posting Level *</label>
//                 <select name="posting_level" className="form-select">
//                   <option value="everywhere">🌍 Everywhere</option>
//                   <option value="all_states">🏛️ All States</option>
//                   <option value="all_cities_in_state">🏙️ All Cities in State</option>
//                   <option value="all_areas_in_city">🏘️ All Areas in City</option>
//                   <option value="specific_areas_in_city">🎯 Specific Areas in City</option>
//                 </select>
//               </div>

//               {/* Static State */}
//               <div className="mb-3">
//                 <label className="form-label fw-bold">State *</label>
//                 <select name="state" className="form-select">
//                   <option value="">-- Select State --</option>
//                   <option value="Maharashtra">Maharashtra</option>
//                   <option value="Karnataka">Karnataka</option>
//                   <option value="Gujarat">Gujarat</option>
//                   <option value="Delhi">Delhi</option>
//                 </select>
//               </div>

//               {/* Static City */}
//               <div className="mb-3">
//                 <label className="form-label fw-bold">City *</label>
//                 <select name="city" className="form-select">
//                   <option value="">-- Select City --</option>
//                   <option value="Mumbai">Mumbai</option>
//                   <option value="Pune">Pune</option>
//                   <option value="Bangalore">Bangalore</option>
//                   <option value="Ahmedabad">Ahmedabad</option>
//                   <option value="Delhi">Delhi</option>
//                 </select>
//               </div>

//               {/* Static Areas */}
//               <div className="mb-3">
//                 <label className="form-label fw-bold">Areas *</label>
//                 <select name="specific_areas" className="form-select" multiple size="5">
//                   <option value="Andheri">Andheri</option>
//                   <option value="Bandra">Bandra</option>
//                   <option value="Juhu">Juhu</option>
//                   <option value="Whitefield">Whitefield</option>
//                   <option value="Koramangala">Koramangala</option>
//                   <option value="Satellite">Satellite</option>
//                   <option value="Dwarka">Dwarka</option>
//                 </select>
//               </div>

//               <div className="d-flex justify-content-end">
//                 <button type="submit" className="btn btn-primary btn-lg">
//                   <FaPaperPlane className="me-2" /> Post Ads
//                 </button>
//               </div>

//             </form>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default BulkPostAdsForm;





// import { FaLayerGroup, FaPaperPlane } from "react-icons/fa";
// import { useGetStateQuery } from "../../../store/features/location/state/stateApi";
// import { useGetCityByStateIdQuery } from "../../../store/features/location/city/cityApi";

// const BulkPostAdsForm = () => {

//   const {data,isLoading} = useGetStateQuery();

//   // console.log("data ======>",data)

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <div className="p-4">
//         <div className="card shadow-sm border-0">
//           <div className="card-header bg-gradient-primary text-white">
//             <h4 className="mb-0">
//               <FaLayerGroup className="me-2" /> Bulk Post Ads
//             </h4>
//           </div>

//           <div className="card-body p-4">
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Ad Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   className="form-control form-control-lg"
//                   placeholder="Best services in  {state} , {city}, {area}"
//                   required
//                 />
//               </div>


//               {/* Description */}
//               <div className="mb-4">
//                 <label className="form-label fw-bold">Ad Description *</label>
//                 <textarea
//                   name="description"
//                   className="form-control"
//                   rows="5"
//                   placeholder="Describe your ad. Mention service details in {state}, {city},  {area}."
//                   required
//                 />
//               </div>

//                             {/* Static State */}
//               <div className="mb-3">
//                 <label className="form-label fw-bold">State *</label>
//                 <select name="state" className="form-select">
//                   <option value="">-- Select State --</option>
//                   {data?.map((st) =>( <option key={st._id} value={st._id}> {st.name} </option>))}


//                 </select>
//               </div>

//             </form>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default BulkPostAdsForm;



import React, { useState } from "react";
import { useCreatePostMutation } from "../../../store/features/post/postApi";
import { useGetCategoryQuery } from "../../../store/features/category/categoryApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const BulkPostAdsForm = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");
  const [state, setState] = useState("Uttar Pradesh");
  const [cities, setCities] = useState(["Agra", "Gorakhpur"]);
  const [areas, setAreas] = useState(["MG Road", "Civil Lines"]);

  // RTK Query mutation hook
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()
  const [createPost, { isLoading, error, data }] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      category,
      state,
      cities,
      areas,
    };

    try {
      console.log("form data   const payload", payload)
      const result = await createPost(payload).unwrap();
      toast.success('Post added successfully!');
      console.log("Generated posts from backend:", result);

       setTimeout(() => {
                navigate('/dashboard/ads-list');
            }, 1000);

      // Optionally reset form
      // setTitle("");
      // setDescription("");
    } catch (err) {
        toast.error(error.data.error || 'Error saving Post!');
      console.error("Failed to generate posts:", err);
    }
  };

  return (
    <>
    <ToastContainer />
     <div className="p-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-gradient-primary text-white">
          <h4 className="mb-0">Bulk Post Ads</h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>


            <div className="row mb-4">

              {/* User */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Post As User *</label>
                <select name="user_id" className="form-select form-select-lg" required>
                  <option value="">-- Select User --</option>
                  <option value="1">John Doe (john@example.com)</option>
                  <option value="2">Alice Smith (alice@example.com)</option>
                  <option value="3">David Clark (david@example.com)</option>
                </select>
              </div>

              {/* Category */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Category *</label>
                <select name="category_id" className="form-select form-select-lg" required onChange={(e) => setCategory(e.target.value)}>
                  <option value="">-- Select Category --</option>
                  {categories?.map((cat) => (
                    <option value={cat._id}> {cat.name} </option>
                  ))}


                </select>
              </div>

            </div>
            {/* Title */}
            <div className="mb-4">
              <label className="form-label fw-bold">Ad Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Best AC repair in {state}, {city}, {area}"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <small className="text-muted">
                Use placeholders: {"{state}"}, {"{city}"}, {"{area}"}
              </small>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold">Ad Description *</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Write your description. Mention {state}, {city}, {area} multiple times."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
             <div className="mb-4">
                <label className="form-label fw-bold">Posting Level *</label>
                <select name="posting_level" className="form-select">
               
                  <option value="state">🏛️ All States</option>
                  <option value="city">🏙️ All Cities in State</option>
                  <option value="area">🏘️ All Areas in City</option>
                 
                </select>
              </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Posts"}
            </button>

            {error && (
              <p className="text-danger mt-2">
                Error generating posts: {error?.data?.message || error.message}
              </p>
            )}

            {data && (
              <div className="mt-3">
                <h6>Generated Posts:</h6>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default BulkPostAdsForm;
