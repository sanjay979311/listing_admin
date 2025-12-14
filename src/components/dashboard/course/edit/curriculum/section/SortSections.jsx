

// import React, { useState } from "react";
// import { IoSwapVertical } from "react-icons/io5";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Card,
//   CardBody,
// } from "reactstrap";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import sectionsData from "../../../../data/sectionsData.json";

// const SortSection = () => {
//   const [modal, setModal] = useState(false);
//   const [sections, setSections] = useState(sectionsData);

//   const toggle = () => setModal(!modal);

//   // Handle drag-and-drop reorder
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(sections);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setSections(reordered);
//   };

//   const handleUpdateSorting = () => {
//     console.log("Updated Order:", sections.map((s) => s.title));
//     alert("Sections have been sorted!");
//     toggle();
//   };

//   return (
//     <>
//       {/* Button to open modal */}
//       <button
//         className="btn btn-outline-primary btn-rounded btn-sm"
//         onClick={toggle}
//       >
//         <IoSwapVertical /> Sort sections
//       </button>

//       {/* Modal */}
//       <Modal isOpen={modal} toggle={toggle} size="lg" centered>
//         <div className="modal-content">
//           <div className="modal-header">
//             <h4 className="modal-title">Sort Sections</h4>
//             <button
//               type="button"
//               className="close"
//               onClick={toggle}
//               aria-hidden="true"
//             >
//               ×
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="row">
//               <div className="col-12">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="bg-dragula p-3">
//                       <h5 className="d-flex justify-content-between align-items-center mt-0">
//                         List of Sections
//                         <Button
//                           color="outline-primary"
//                           size="sm"
//                           className="btn-rounded"
//                           onClick={handleUpdateSorting}
//                         >
//                           Update Sorting
//                         </Button>
//                       </h5>

//                       {/* Drag and Drop List */}
//                       <div id="section-list" className="py-2">
//                         <DragDropContext onDragEnd={handleDragEnd}>
//                           <Droppable droppableId="section-list">
//                             {(provided) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                               >
//                                 {sections.map((section, index) => (
//                                   <Draggable
//                                     key={section.id}
//                                     draggableId={section.id.toString()}
//                                     index={index}
//                                   >
//                                     {(provided) => (
//                                       <Card
//                                         className="mb-2 mt-2 draggable-item"
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                       >
//                                         <CardBody>
//                                           <div className="media">
//                                             <div className="media-body">
//                                               <h6 className="mb-1 mt-0">
//                                                 {section.title}
//                                               </h6>
//                                             </div>
//                                           </div>
//                                         </CardBody>
//                                       </Card>
//                                     )}
//                                   </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                               </div>
//                             )}
//                           </Droppable>
//                         </DragDropContext>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SortSection;

// src/components/SortSection.jsx

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { IoSwapVertical } from "react-icons/io5";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

import sectionsData from "../../../../../../data/sectionsData.json"; // adjust path

const SortSection = () => {
  const [modal, setModal] = useState(false);
  const [sections, setSections] = useState(
    sectionsData.map((s) => ({ ...s, id: String(s.id) }))
  );

  const toggle = () => setModal(!modal);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((item) => item.id === active.id);
    const newIndex = sections.findIndex((item) => item.id === over.id);
    setSections((items) => arrayMove(items, oldIndex, newIndex));
  };

  const handleUpdateSorting = () => {
    console.log("Sorted Section Order:", sections.map((s) => s.id));
    alert("Sections have been sorted successfully!");
    toggle();
  };

  return (
    <>
      <button
        className="btn btn-outline-primary btn-rounded btn-sm"
        onClick={toggle}
      >
        <IoSwapVertical /> Sort Sections
      </button>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Sort Sections</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="card bg-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mt-0 mb-0">List of Sections</h5>
                    <Button
                      color="outline-primary"
                      size="sm"
                      className="btn-rounded"
                      onClick={handleUpdateSorting}
                    >
                      Update Sorting
                    </Button>
                  </div>

                  {/* 🧩 Drag & Drop List */}
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={sections.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div id="section-list" className="py-2">
                        {sections.map((section) => (
                          <SortableItem key={section.id} id={section.id}>
                            <div
                              className="card mb-0 mt-2 draggable-item"
                              id={section.id}
                            >
                              <div className="card-body">
                                <div className="media">
                                  <div className="media-body">
                                    <h5 className="mb-1 mt-0">
                                      {section.title}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SortableItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

       
      </Modal>
    </>
  );
};

export default SortSection;
