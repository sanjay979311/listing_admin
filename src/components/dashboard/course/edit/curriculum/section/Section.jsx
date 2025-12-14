


// import React, { useState } from "react";
// import { IoPencil, IoClose, IoFolderOpen } from "react-icons/io5";
// import SortLesson from "../lession/Sortlesson";
// import EditSection from "./EditSection";
// import ConfirmDeleteModal from "../../../../common/ConfirmDeleteModal";
// import EditLession from "../lession/EditLession";
// import ConfirmDeleteModal from "../../../../common/ConfirmDeleteModal";

// const Section = ({ section }) => {
//   const [lessons, setLessons] = useState(section.lessons);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const handleUpdateLessons = (newOrder) => {
//     setLessons(newOrder);
//   };

//   const handleDeleteClick = () => setShowDeleteModal(true);
//   const handleCancelDelete = () => setShowDeleteModal(false);
//   const handleConfirmDelete = () => {
//     console.log("Deleting section:", section.deleteSectionUrl);
//     setShowDeleteModal(false);
//   };

//   const showAjaxModal = (url, title) =>
//     console.log(`Open modal: ${title} | URL: ${url}`);

//   return (
//     <div className="col-xl-12 mb-4">
//       <div className="card bg-white text-dark on-hover-action shadow-sm">
//         <div className="card-body">
//           <h5 className="card-title d-flex justify-content-between align-items-center">
//             <span>
//               <strong>{section.title}</strong>: {section.description}
//             </span>

//             <div className="d-flex gap-2">
//               {/* <SortLesson lessons={lessons} onUpdateLessons={handleUpdateLessons} /> */}
//               <SortLesson lessons={lessons} onUpdateLessons={setLessons} />
//               <EditSection />
//               <button
//                 className="btn btn-outline-secondary btn-rounded btn-sm"
//                 onClick={handleDeleteClick}
//               >
//                 <IoClose /> Delete section
//               </button>
//             </div>
//           </h5>

//           <div className="mt-3">
//             {lessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className="card bg-white text-dark on-hover-action mb-2 w-100 shadow-sm"
//               >
//                 <div className="card-body thinner-card-body d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0 d-flex align-items-center gap-2">
//                     <img src={lesson.icon} alt="" height="16" />
//                     {lesson.title}: {lesson.description}
//                   </h6>

//                   <div className="d-flex gap-2">


//                     <EditLession
//                       lesson={lesson}
//                       onUpdate={(updatedLesson) => {
//                         const updatedLessons = [...lessons];
//                         updatedLessons[index] = updatedLesson;
//                         setLessons(updatedLessons);
//                       }}
//                     />

//                     <button
//                       className="btn btn-outline-secondary btn-sm"
//                       onClick={() =>
//                         console.log("Confirm delete lesson:", lesson.deleteUrl)
//                       }
//                     >
//                       <IoClose />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <ConfirmDeleteModal
//         show={showDeleteModal}
//         onHide={handleCancelDelete}
//         onConfirm={handleConfirmDelete}
//         title="Delete Section"
//         message={`Are you sure you want to delete the section "${section.title}"?`}
//       />
//     </div>
//   );
// };

// export default Section;


import React, { useState } from "react";
import { IoPencil, IoClose, IoFolderOpen } from "react-icons/io5";
import SortLesson from "../lession/Sortlesson";
import EditSection from "./EditSection";
import EditLession from "../lession/EditLession";
import ConfirmDeleteModal from "../../../../../common/ConfirmDeleteModal";

const Section = ({ section }) => {
  const [lessons, setLessons] = useState(section.lessons);
  const [showDeleteSectionModal, setShowDeleteSectionModal] = useState(false);
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  // Update lesson order after sorting
  const handleUpdateLessons = (newOrder) => setLessons(newOrder);

  // Section Delete Handlers
  const handleDeleteSectionClick = () => setShowDeleteSectionModal(true);
  const handleCancelSectionDelete = () => setShowDeleteSectionModal(false);
  const handleConfirmSectionDelete = () => {
    console.log("Deleting section:", section.deleteSectionUrl);
    setShowDeleteSectionModal(false);
  };

  // Lesson Delete Handlers
  const handleDeleteLessonClick = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteLessonModal(true);
  };
  const handleCancelLessonDelete = () => {
    setLessonToDelete(null);
    setShowDeleteLessonModal(false);
  };
  const handleConfirmLessonDelete = () => {
    if (lessonToDelete) {
      setLessons(lessons.filter((l) => l.id !== lessonToDelete.id));
      console.log("Deleted lesson:", lessonToDelete.deleteUrl);
      setLessonToDelete(null);
      setShowDeleteLessonModal(false);
    }
  };

  const showAjaxModal = (url, title) =>
    console.log(`Open modal: ${title} | URL: ${url}`);

  return (
    <div className="col-xl-12 mb-4">
      <div className="card bg-white text-dark on-hover-action shadow-sm">
        <div className="card-body">
          {/* Section Header */}
          <h5 className="card-title d-flex justify-content-between align-items-center">
            <span>
              <strong>{section.title}</strong>: {section.description}
            </span>

            <div className="d-flex gap-2">
              <SortLesson lessons={lessons} onUpdateLessons={setLessons} />
              <EditSection />
              <button
                className="btn btn-outline-secondary btn-rounded btn-sm"
                onClick={handleDeleteSectionClick}
              >
                <IoClose /> Delete section
              </button>
            </div>
          </h5>

          {/* Lessons List */}
          <div className="mt-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="card bg-white text-dark on-hover-action mb-2 w-100 shadow-sm"
              >
                <div className="card-body thinner-card-body d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <img src={lesson.icon} alt="" height="16" />
                    {lesson.title}: {lesson.description}
                  </h6>

                  <div className="d-flex gap-2">
                    <EditLession
                      lesson={lesson}
                      onUpdate={(updatedLesson) => {
                        const updatedLessons = [...lessons];
                        updatedLessons[index] = updatedLesson;
                        setLessons(updatedLessons);
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleDeleteLessonClick(lesson)}
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Delete Modal */}
      <ConfirmDeleteModal
        show={showDeleteSectionModal}
        onHide={handleCancelSectionDelete}
        onConfirm={handleConfirmSectionDelete}
        title="Delete Section"
        message={`Are you sure you want to delete the section "${section.title}"?`}
      />

      {/* Lesson Delete Modal */}
      <ConfirmDeleteModal
        show={showDeleteLessonModal}
        onHide={handleCancelLessonDelete}
        onConfirm={handleConfirmLessonDelete}
        title="Delete Lesson"
        message={
          lessonToDelete
            ? `Are you sure you want to delete the lesson "${lessonToDelete.title}"?`
            : ""
        }
      />
    </div>
  );
};

export default Section;
