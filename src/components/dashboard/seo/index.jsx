import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Seo = () => {
  // Sample blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      seoTitle: "React Basics",
      keywords: "React, JavaScript, Frontend",
      description: "Learn the basics of React.",
    },
    {
      id: 2,
      seoTitle: "NodeJS Tutorial",
      keywords: "NodeJS, Backend, API",
      description: "Step-by-step NodeJS tutorial.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  const handleEditClick = (blog) => {
    setEditBlog(blog);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditBlog(null);
  };

  const handleSave = () => {
    setBlogs(
      blogs.map((b) => (b.id === editBlog.id ? editBlog : b))
    );
    handleModalClose();
  };

  return (
    <div className="mt-3">
      <h6 className="fw-semibold mb-3">SEO List</h6>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>SEO Title</th>
            <th>Keywords</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.seoTitle}</td>
              <td>{blog.keywords}</td>
              <td>{blog.description}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditClick(blog)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editBlog && (
            <form>
              <div className="mb-2">
                <label className="form-label small fw-semibold">SEO Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={editBlog.seoTitle}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  value={editBlog.keywords}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={editBlog.description}
                  onChange={(e) =>
                    setEditBlog({ ...editBlog, description: e.target.value })
                  }
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Seo;

