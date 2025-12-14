// import { useState } from "react";
// import { IoPencil } from "react-icons/io5";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// const EditSection = (args) => {
//     const [modal, setModal] = useState(false);

//     const toggle = () => setModal(!modal);
//     return (
//         <>
//             <button
//                 className="btn btn-outline-secondary btn-rounded btn-sm"
//                 onClick={toggle}
//             >
//                 <IoPencil /> Edit section
//             </button>

//             <Modal isOpen={modal} toggle={toggle} {...args}>
//                 <ModalHeader toggle={toggle}> Update section </ModalHeader>
//                 <ModalBody>
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//                     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//                     minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//                     aliquip ex ea commodo consequat. Duis aute irure dolor in
//                     reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//                     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//                     culpa qui officia deserunt mollit anim id est laborum.
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={toggle}>
//                         Do Something
//                     </Button>{' '}
//                     <Button color="secondary" onClick={toggle}>
//                         Cancel
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     )
// }

// export default EditSection;

import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
// import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";

const EditSection = (args) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("Title here"); // Default title

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated title:", title);
    toggle(); // Close modal after save
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary btn-rounded btn-sm"
        onClick={toggle}
      >
        <IoPencil /> Edit section
      </button>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Update Section</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="sectionTitle">Title</Label>
              <Input
                id="sectionTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditSection;
