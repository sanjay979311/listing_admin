
// import { useState } from "react";
// import {
//   IoBookOutline,
//   IoInformationCircleOutline,
//   IoDocumentTextOutline,
//   IoCashOutline,
//   IoImageOutline,
//   IoGlobeOutline,
//   IoCheckmarkCircleOutline,
//   IoTerminalOutline,
// } from "react-icons/io5";
// import Curriculum from './curriculum/Curriculum'
// import Basic from "./basic";
// import Info from "./info";
// import Pricing from "./pricing";
// import Media from './media'
// import Seo from "./SEO";
// const EditCourse = () => {
//   const [activeTab, setActiveTab] = useState("curriculum");

//   const tabs = [
//     { id: "curriculum", icon: <IoBookOutline />, label: "Curriculum" },
//     { id: "basic", icon: <IoInformationCircleOutline />, label: "Basic" },
//     { id: "info", icon: <IoDocumentTextOutline />, label: "Info" },
//     { id: "pricing", icon: <IoCashOutline />, label: "Pricing" },
//     { id: "media", icon: <IoImageOutline />, label: "Media" },
//     { id: "seo", icon: <IoGlobeOutline />, label: "SEO" },
//     { id: "finish", icon: <IoCheckmarkCircleOutline />, label: "Finish" },
//   ];

//   return (
//     <div className="container-fluid mt-4">
//       <div className="col-xl-12">
//         <div className="card box mb-3">
//           <div className="card-body box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
//             <h4 className="page-title mb-0 d-flex align-items-center gap-2">
//               <IoTerminalOutline className="title_icon" />
//               Update Course
//             </h4>
//           </div>
//         </div>
//       </div>

//       <div className="row row-cols-1 g-3 g-md-5">
//         <div className="col">
//           <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
//             <ul className="nav nav-pills nav-justified form-wizard-header mb-5" role="tablist">
//               {tabs.map((tab) => (
//                 <li className="nav-item" key={tab.id}>
//                   <button
//                     className={`nav-link rounded-0 pt-2 pb-2 ${
//                       activeTab === tab.id ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab(tab.id)}
//                   >
//                     <span className="me-1">{tab.icon}</span>
//                     <span className="d-none d-sm-inline">{tab.label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <div className="tab-content mt-4">
//                <div className="tab-content mt-4">
//               {activeTab === "curriculum" &&  <Curriculum />}
//               {activeTab === "basic" &&  <Basic /> } 
//               {activeTab === "info" &&  <Info />}
//               {activeTab === "pricing" &&  <Pricing /> }
//               {activeTab === "media" && <Media />}
//               {activeTab === "seo" && <Seo /> }
//               {activeTab === "finish" && <div>Finish Tab Content</div>}
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCourse;


import { useState } from "react";
import {
  IoBookOutline,
  IoInformationCircleOutline,
  IoDocumentTextOutline,
  IoCashOutline,
  IoImageOutline,
  IoGlobeOutline,
  IoCheckmarkCircleOutline,
  IoTerminalOutline,
} from "react-icons/io5";

import Curriculum from "./curriculum/Curriculum";
import Basic from "./basic";
import Info from "./info";
import Pricing from "./pricing";
import Media from "./media";
import Seo from "./SEO";

const EditCourse = () => {
  const [activeTab, setActiveTab] = useState("curriculum");

  // 🧩 Centralized form state for all tabs
  const [formData, setFormData] = useState({
    basic: {
      courseType: "",
      title: "",
      shortDescription: "",
      description: "",
      category: "",
      subCategory: "",
      level: "",
      language: "",
    },
    info: {},
    pricing: {
      price: "",
      discount: "",
      currency: "",
    },
    media: {
      overviewProvider: "",
      overviewUrl: "",
      thumbnail: null,
    },
    seo: {
      metaKeywords: [],
      metaDescription: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Submitted Course Data:", formData);
    alert("✅ Course submitted successfully!");
  };

  const tabs = [
    { id: "curriculum", icon: <IoBookOutline />, label: "Curriculum" },
    { id: "basic", icon: <IoInformationCircleOutline />, label: "Basic" },
    { id: "info", icon: <IoDocumentTextOutline />, label: "Info" },
    { id: "pricing", icon: <IoCashOutline />, label: "Pricing" },
    { id: "media", icon: <IoImageOutline />, label: "Media" },
    { id: "seo", icon: <IoGlobeOutline />, label: "SEO" },
    { id: "finish", icon: <IoCheckmarkCircleOutline />, label: "Finish" },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="col-xl-12">
        <div className="card box mb-3">
          <div className="card-body box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="page-title mb-0 d-flex align-items-center gap-2">
              <IoTerminalOutline className="title_icon" />
              Update Course
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
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link rounded-0 pt-2 pb-2 ${activeTab === tab.id ? "active" : ""
                      }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="me-1">{tab.icon}</span>
                    <span className="d-none d-sm-inline">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Contents */}
            <div className="tab-content mt-4">
              {activeTab === "curriculum" && <Curriculum />}
              {activeTab === "basic" && (
                <Basic data={formData.basic} setData={(data) => setFormData({ ...formData, basic: data })} />
              )}
              {activeTab === "info" && (
                <Info data={formData.info} setData={(data) => setFormData({ ...formData, info: data })} />
              )}
              {activeTab === "pricing" && (
                <Pricing data={formData.pricing} setData={(data) => setFormData({ ...formData, pricing: data })} />
              )}
              {activeTab === "media" && (
                <Media data={formData.media} setData={(data) => setFormData({ ...formData, media: data })} />
              )}
              {activeTab === "seo" && (
                <Seo data={formData.seo} setData={(data) => setFormData({ ...formData, seo: data })} />
              )}

              {/* 🎯 Finish Tab */}
              {activeTab === "finish" && (
                <div className="text-center mt-5">
                  <h3 className="text-success fw-bold mb-2">Thank you!</h3>
                  <p className="text-muted mb-4">You are just one click away</p>
                  <button type="submit" className="btn btn-success px-5 py-2 fs-5 rounded-pill shadow" onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
                // <div className="text-center py-5">
                //   <h4 className="mb-3 text-success fw-bold">All steps completed!</h4>
                //   <p className="text-muted mb-4">Please review your details and click below to submit your course.</p>

                //   <button
                //     className="btn btn-lg btn-gradient-primary px-5 py-3 rounded-pill shadow"
                //     style={{
                //       background: "linear-gradient(90deg, #00b09b, #96c93d)",
                //       color: "#fff",
                //       border: "none",
                //       transition: "0.3s",
                //     }}
                //     onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                //     onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                //     onClick={handleSubmit}
                //   >
                //     🚀 Submit Course
                //   </button>
                // </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
