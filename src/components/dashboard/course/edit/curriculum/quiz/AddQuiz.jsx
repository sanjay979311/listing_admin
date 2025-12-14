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
  Row,
  Col,
} from "reactstrap";

const AddQuiz = () => {
  const [modal, setModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const toggle = () => setModal(!modal);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quizTitle || !question || !correctAnswer) {
      alert("Please fill in all required fields.");
      return;
    }

    const quizData = {
      title: quizTitle,
      question,
      options,
      correctAnswer,
      explanation,
    };

    console.log("New Quiz Added:", quizData);
    alert("Quiz added successfully!");

    // Reset form
    setQuizTitle("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setExplanation("");
    toggle();
  };

  return (
    <>
      <button
        className="btn btn-outline-primary btn-rounded btn-sm"
        onClick={toggle}
      >
        <IoAdd /> Add Quiz
      </button>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Add New Quiz</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="quizTitle">Quiz Title</Label>
              <Input
                id="quizTitle"
                type="text"
                placeholder="Enter quiz title (e.g., JavaScript Basics)"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="question">Question</Label>
              <Input
                id="question"
                type="text"
                placeholder="Enter quiz question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Options</Label>
              <Row>
                {options.map((opt, index) => (
                  <Col md={6} key={index}>
                    <Input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      required
                      className="mb-2"
                    />
                  </Col>
                ))}
              </Row>
            </FormGroup>

            <FormGroup>
              <Label for="correctAnswer">Correct Answer</Label>
              <Input
                id="correctAnswer"
                type="select"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                required
              >
                <option value="">Select correct option</option>
                {options.map(
                  (opt, index) =>
                    opt && (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    )
                )}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="explanation">Explanation (optional)</Label>
              <Input
                id="explanation"
                type="textarea"
                placeholder="Add a brief explanation for the correct answer"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
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

export default AddQuiz;
