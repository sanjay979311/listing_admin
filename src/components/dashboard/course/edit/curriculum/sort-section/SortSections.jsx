

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
import { SortableItem } from "../section/SortableItem";
import sectionsData from "../../../../data/sectionsData.json"; // adjust path if needed

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
