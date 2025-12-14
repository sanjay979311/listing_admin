

import React, { useState } from "react";
import { IoSwapVertical, IoReorderThree } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable lesson item
const SortableLessonItem = ({ lesson }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border rounded p-2 mb-2 d-flex align-items-center gap-2 bg-light"
    >
      <IoReorderThree size={20} />
      <img src={lesson.icon} alt="" height="16" />
      <span>
        <strong>{lesson.title}</strong>: {lesson.description}
      </span>
    </div>
  );
};

const SortLesson = ({ lessons, onUpdateLessons }) => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState(lessons);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    onUpdateLessons(items); // send new order to parent
    setShowModal(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        className="btn btn-outline-secondary btn-rounded btn-sm"
        onClick={() => setShowModal(true)}
      >
        <IoSwapVertical /> Sort Lessons
      </button>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Sort Lessons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((lesson) => (
                <SortableLessonItem key={lesson.id} lesson={lesson} />
              ))}
            </SortableContext>
          </DndContext>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SortLesson;
