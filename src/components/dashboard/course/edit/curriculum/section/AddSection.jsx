import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input, Form, FormGroup, Label } from 'reactstrap';


const AddSection = () => {
    const [modal, setModal] = useState(false);
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const toggle = () => setModal(!modal);

     const handleSubmit = (e) => {
        e.preventDefault();
     }

    return (
        <>
            <button className="btn btn-outline-primary btn-rounded btn-sm" onClick={toggle}>
                <IoAdd /> Add section
            </button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}> Add new section  </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="sectionTitle">Section Title</Label>
                            <Input
                                id="sectionTitle"
                                type="text"
                                placeholder="Enter section title"
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="sectionDescription">Description</Label>
                            <Input
                                id="sectionDescription"
                                type="text"
                                placeholder="Enter section description"
                                value={sectionDescription}
                                onChange={(e) => setSectionDescription(e.target.value)}
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
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter> */}
            </Modal>
        </>
    )
}

export default AddSection;