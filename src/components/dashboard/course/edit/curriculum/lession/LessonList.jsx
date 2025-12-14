// // LessonList.jsx
// import React, { useState } from "react";
// import EditLession from "../lession/EditLession";
// import ConfirmDeleteModal from "../../../../../common/ConfirmDeleteModal";
// import { IoClose } from "react-icons/io5";
// import { FaYoutube } from "react-icons/fa";

// const LessonList = ({ lessons, setLessons }) => {
//   const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
//   const [lessonToDelete, setLessonToDelete] = useState(null);

//   // DELETE LESSON ACTION
//   const handleDeleteLessonClick = (lesson) => {
//     setLessonToDelete(lesson);
//     setShowDeleteLessonModal(true);
//   };

//   const handleCancelLessonDelete = () => {
//     setLessonToDelete(null);
//     setShowDeleteLessonModal(false);
//   };

//   const handleConfirmLessonDelete = () => {
//     if (lessonToDelete) {
//       setLessons((prev) =>
//         prev.filter((l) => l._id !== lessonToDelete._id)
//       );

//       console.log("Deleted lesson:", lessonToDelete._id);

//       setLessonToDelete(null);
//       setShowDeleteLessonModal(false);
//     }
//   };

//   return (
//     <>
//       {/* LESSON LIST */}
//       <div className="mt-3">
//         {lessons.map((lesson, index) => (
//           <div
//             key={lesson._id}
//             className="card bg-white text-dark on-hover-action mb-2 w-100 shadow-sm"
//           >
//             <div className="card-body thinner-card-body d-flex justify-content-between align-items-center">

//               {/* LESSON TITLE */}
//               <h6 className="mb-0 d-flex align-items-center gap-2">
//                 <img src={lesson.icon} alt="" height="16" />
//                 <FaYoutube />

//                 <strong>Lesson {index + 1}:</strong> {lesson.title} ({lesson.duration} min)
//               </h6>

//               <div className="d-flex gap-2">
//                 <EditLession
//                   lesson={lesson}
//                   onUpdate={(updatedLesson) => {
//                     const updatedList = [...lessons];
//                     updatedList[index] = updatedLesson;
//                     setLessons(updatedList);
//                   }}
//                 />

//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={() => handleDeleteLessonClick(lesson)}
//                 >
//                   <IoClose />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DELETE MODAL */}
//       <ConfirmDeleteModal
//         show={showDeleteLessonModal}
//         onHide={handleCancelLessonDelete}
//         onConfirm={handleConfirmLessonDelete}
//         title="Delete Lesson"
//         message={
//           lessonToDelete
//             ? `Are you sure you want to delete the lesson "${lessonToDelete.title}"?`
//             : ""
//         }
//       />
//     </>
//   );
// };

// export default LessonList;


// LessonList.jsx


import React, { useState } from "react";
import EditLession from "../lession/EditLession";
import ConfirmDeleteModal from "../../../../../common/ConfirmDeleteModal";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { useGetLessonsBySectionIdQuery } from "../../../../../../store/features/lession/lessionApi";

const LessonList = ({ sectionId }) => {
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const { data = [], isLoading } = useGetLessonsBySectionIdQuery(sectionId);

  // DELETE: Open Modal
  const handleDeleteLessonClick = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteLessonModal(true);
  };

  const handleCancelLessonDelete = () => {
    setLessonToDelete(null);
    setShowDeleteLessonModal(false);
  };

  const handleConfirmLessonDelete = () => {
    // NOTE: Only UI delete. API delete required in backend.
    console.log("Deleted lesson:", lessonToDelete?._id);

    setLessonToDelete(null);
    setShowDeleteLessonModal(false);
  };

  if (isLoading) return <p>Loading lessons...</p>;

  return (
    <>
      {/* LESSON LIST */}
      <div className="mt-3">
        {data?.map((lesson, index) => (
          <div
            key={lesson._id}
            className="card bg-white text-dark on-hover-action mb-2 w-100 shadow-sm"
          >
            <div className="card-body thinner-card-body d-flex justify-content-between align-items-center">

              {/* LESSON TITLE */}
              <h6 className="mb-0 d-flex align-items-center gap-2">
                {lesson.icon && <img src={lesson.icon} alt="" height="16" />}
                <FaYoutube />
                <strong>Lesson {index + 1}:</strong> {lesson.title} ({lesson.duration} min)
              </h6>

              <div className="d-flex gap-2">
                <EditLession
                  lesson={lesson}
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

      {/* DELETE MODAL */}
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
    </>
  );
};

export default LessonList;
