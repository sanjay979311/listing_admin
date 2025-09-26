
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";





// const AddWebInfo = () => {


//     const [address, setAddress] = useState("");
//     const [phoneNo, setPhoneNo] = useState("");
//     const [email, setEmail] = useState("");
//     const [facebook, setFacebook] = useState("");
//     const [twitter, setTwitter] = useState("");
//     const [instagram, setInstagram] = useState("");
//     const [linkedIn, setLinkedIn] = useState("");

//     const router = useNavigate()


//     useEffect(() => {
//         getSingleRecord();
//     }, []);


//     const getSingleRecord = async () => {
//         try {
//             let response = await axios.get(`/api/web-info`);
//             console.log("web info is =======>",response)
//             if (response.data) {
//                 setAddress(response.data.address);
//                 setPhoneNo(response.data.phoneNo)
//                 setEmail(response.data.email);
//                 setFacebook(response.data.facebook);
//                 setTwitter(response.data.twitter);
//                 setInstagram(response.data.instagram);
//                 setLinkedIn(response.data.linkedIn);


//             }
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 // Use API error response if available
//                 const errorMessage = error.response.data.message || 'Error fetching record';
//                 toast.error(`Error: ${errorMessage}`);
//             } else {
//                 toast.error('Error fetching record');
//             }
//         }
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         try {
//             let formData = {
//                 address,
//                 phoneNo,
//                 email,
//                 facebook,
//                 twitter,
//                 instagram,
//                 linkedIn,
//             }


//             const response = await axios.post('/api/web-info', formData);
//             // const response = await axios.post('/api/about-brief',data);

//             if (response.data.success === false) {
//                 toast.error(response.data.message);

//             } else {
//                 toast.success(response.data.message)
//             }

//         } catch (error) {
//             // toast.error(error.response.data);
//             console.error('Error:', error);
//         }

//     }



//     return (
//         <>



//             <ToastContainer />
//             <div className="container-fluid">
//                 <h5 className="mb-4"> Update  Web Info   </h5>
//                 <form  onSubmit={handleSubmit}>
//                     <div className="row row-cols-1">

//                         <div className="col">
//                             <div className="py-4 border-top" >
//                                 <div className="row align-items-center">
//                                     {/* <div className="col-md-4">
//                                         <div>
//                                             <h6>Description</h6>
//                                             <p className="text-secondary">Add your  necessary information from here</p>
//                                         </div>
//                                     </div> */}
//                                     <div className="col-md-12">


//                                         <div className="card border-0 p-3 shadow-sm">
//                                             <div className="card-body bg-light">
//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Address</label>
//                                                         <input className="form-control" type="text" name="" placeholder="Address"
//                                                             onChange={(e) => setAddress(e.target.value)}
//                                                             value={address}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Phone No </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Phone No"
//                                                             onChange={(e) => setPhoneNo(e.target.value)}
//                                                             value={phoneNo}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Email  </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Email Address"
//                                                             onChange={(e) => setEmail(e.target.value)}
//                                                             value={email}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Facebook  </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Facebook "
//                                                             onChange={(e) => setFacebook(e.target.value)}
//                                                             value={facebook}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Twitter  </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Twitter "
//                                                             onChange={(e) => setTwitter(e.target.value)}
//                                                             value={twitter}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium"> Instagram  </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Instagram "
//                                                             onChange={(e) => setInstagram(e.target.value)}
//                                                             value={instagram}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Linkd In  </label>
//                                                         <input className="form-control" type="text" name="" placeholder="Linked In "
//                                                             onChange={(e) => setLinkedIn(e.target.value)}
//                                                             value={linkedIn}
//                                                         />
//                                                     </div>
//                                                 </div>







//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>



//                         <div className="col sticky-bottom">
//                             <div className="mt-4 bg-gray-1 py-3 border-top border-primary" >
//                                 <div className="row">
//                                     <div className="col-auto">
//                                         <div>
//                                             <a className="btn btn-outline-primary btn-lg fw-semibold" href="#">Back</a>
//                                         </div>
//                                     </div>
//                                     <div className="col-auto ms-auto">
//                                         <div>
//                                             <button className="btn btn-primary btn-lg fw-semibold" type="submit">Update </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </form>
//             </div>

//         </>
//     )
// }

// export default AddWebInfo;


// // const WebInfo = () =>{
// //     return(
// //         <>
// //         <h1> Web Info </h1>
// //         </>
// //     )
// // }

// // export default WebInfo;


import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import {
  useGetWebInfoQuery,
  useCreateOrUpsertWebInfoMutation
} from '../../../store/features/web-info/webInfoApi';

const WebInfoForm = () => {
  // Fetch Web Info
  const { data: webInfo, isLoading, isError } = useGetWebInfoQuery();

  // Mutation to create or update Web Info
  const [createOrUpsertWebInfo, { isLoading: isUpdating }] = useCreateOrUpsertWebInfoMutation();

  // Form state
  const [formData, setFormData] = useState({
    address: "",
    phoneNo: "",
    email: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
  });

  // Populate form when webInfo is loaded
  useEffect(() => {
    if (webInfo && webInfo.data) {
      setFormData({
        address: webInfo.data.address || "",
        phoneNo: webInfo.data.phoneNo || "",
        email: webInfo.data.email || "",
        facebook: webInfo.data.facebook || "",
        twitter: webInfo.data.twitter || "",
        instagram: webInfo.data.instagram || "",
        linkedIn: webInfo.data.linkedIn || "",
      });
    }
  }, [webInfo]);

  // Handle input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrUpsertWebInfo(formData).unwrap();
      toast.success(response.message || "Web Info updated successfully!");
    } catch (error) {
      toast.error("Failed to update Web Info");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading Web Info...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger mx-3 mt-3">
        Error loading Web Info. Please try again.
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Update Web Info</h5>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label fw-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={key}
                  placeholder={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Web Info"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebInfoForm;
