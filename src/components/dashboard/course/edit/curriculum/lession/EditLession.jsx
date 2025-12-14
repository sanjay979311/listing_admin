import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoPencil } from "react-icons/io5";

const EditLession = ({ lesson, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);

  const handleSave = () => {
    onUpdate({ ...lesson, title, description });
    setShow(false);
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setShow(true)}
      >
        <IoPencil />
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditLession;
