

import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

const AddLession = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [summary, setSummary] = useState("");

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLesson = {
      title,
      section,
      videoUrl,
      duration,
      summary,
    };

    console.log("New Lesson Data:", newLesson);

    // Here you can send `newLesson` to backend or update state
    setModal(false);
    setTitle("");
    setSection("");
    setVideoUrl("");
    setDuration("");
    setSummary("");
  };

  return (
    <>
      <button
        className="btn btn-outline-primary btn-rounded btn-sm"
        onClick={toggle}
      >
        <IoAdd /> Add lesson
      </button>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Add New Lesson</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="lessonTitle">Title</Label>
              <Input
                id="lessonTitle"
                type="text"
                placeholder="Enter lesson title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="lessonSection">Section</Label>
              <Input
                id="lessonSection"
                type="select"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              >
                <option value="">Select Section</option>
                <option value="Introduction">Introduction</option>
                <option value="Basics">Basics</option>
                <option value="Advanced">Advanced</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="Enter video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="duration">Duration (e.g., 10:30 or 45 min)</Label>
              <Input
                id="duration"
                type="text"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="summary">Summary</Label>
              <Input
                id="summary"
                type="textarea"
                placeholder="Enter short summary"
                rows="3"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </FormGroup>

            <ModalFooter>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddLession;
