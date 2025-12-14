

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";
import './style.css'

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dropdownOpenRow, setDropdownOpenRow] = useState(null);

  // Fetch Data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  // Actions
  const handleEdit = (course) => alert(`Edit: ${course.title}`);

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    setDropdownOpenRow(null)
  };

  const handleConfirmDelete = () => {
    // 🔥 here you can call your API to delete (e.g. deleteEntry(course.id))
    alert(`Deleted: ${selectedCourse.title}`);
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Filtered Data
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(filterText.toLowerCase()) ||
      course.body.toLowerCase().includes(filterText.toLowerCase())
  );


  const actionsMemo = (data) =>{
    console.log("data is =======>",data)
    // 
  }

  // Columns
  const columns = [
    {
      name: "ID",
      cell: (row) => filteredCourses.indexOf(row) + 1,
      width: "70px",
    },
    {
      name: "Image",
      cell: () => (
        <img
          src="https://digitalindialearning.com/img/logo.png"
          alt="Course"
          style={{
            borderRadius: "8px",
            width: "50px",
            height: "50px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      ),
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Category",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Lession and session",
      selector: (row) => row.body,
      wrap: true,
      grow: 3,
    },
    {
      name: "Enrolled Student",
      selector: (row) => "Enrollment" + 1,
      wrap: true,
      grow: 3,
    },
    
    
   {
  name: "Status",
  cell: (row) => (
    <span
      className={`status-pill ${row.userId % 2 === 0 ? "active" : "inactive"}`}
    >
      {row.userId % 2 === 0 ? "Active" : "Inactive"}
    </span>
  ),
  sortable: true,
  width: "100px",
},

   {
  name: "Price",
  cell: (row) => (
    <span style={{ fontWeight: 500, color: "#333" }}>
      ₹ {row.userId * 1000} {/* Example: converting userId to price */}
    </span>
  ),
  sortable: true,
  width: "100px",
},
    {
  name: "Actions",
  cell: (row, index) => (
    <div className="position-relative">
      {/* Ellipsis Button */}
      <button
        type="button"
        className="action-btn"
        onClick={() =>
          setDropdownOpenRow(dropdownOpenRow === index ? null : index)
        }
      >
        <AiOutlineEllipsis size={18} />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpenRow === index && (
        <ul className="custom-dropdown">
          <li>
            <a
              href={`https://demo.creativeitem.com/academy/home/course/wordpress-theme-development-with-bootstrap/${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View course on frontend
            </a>
          </li>
          <li>
            <a
              href={`https://demo.creativeitem.com/academy/home/lesson/wordpress-theme-development-with-bootstrap/${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to course playing page
            </a>
          </li>
          <li>
            <a
              href={`https://demo.creativeitem.com/academy/admin/course_form/course_edit/${row.id}?tab=academic_progress`}
            >
              Academic progress
            </a>
          </li>
          <li>
            <Link
              to={`/dashboard/edit-course/${row.id}`}
            >
              Edit this course
            </Link>
          </li>
          <li>
            <a
              href={`https://demo.creativeitem.com/academy/admin/course_form/course_duplicate/${row.id}`}
            >
              Duplicate this course
            </a>
          </li>
          <li>
            <a
              href={`https://demo.creativeitem.com/academy/admin/course_form/course_edit/${row.id}`}
            >
              Section and lesson
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => alert(`Mark as pending: ${row.title}`)}
            >
              Mark as pending
            </a>
          </li>
          <li>
            <a
              href="#"
              className="delete-item"
              onClick={() => handleDeleteClick(row)}
            >
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  ),
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width: "220px",
}



  ];

  return (
    <div className="container-fluid mt-4">
       {/* Top Card Row */}
  <div className="col-xl-12">
    <div className="card box mb-3">
      <div className="card-body  box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
        {/* Left: Title */}
        <h4 className="page-title mb-0 d-flex align-items-center gap-2">
          <i className="mdi mdi-apple-keyboard-command title_icon"></i> Manage Course
        </h4>

        {/* Right: Add Button */}
        <Link
          to="/dashboard/add-course"
          className="btn btn-outline-primary btn-rounded"
        >
          <i className="mdi mdi-plus"></i> + Add new  Course
        </Link>
      </div>
    </div>
  </div>
      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            {/* Header: Add Course + Search */}
             <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
              <button className="btn btn-secondary buttons-csv" type="button">
                Export as CSV
              </button>

              <div>
                <span>Search: </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search blogs..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={filteredCourses}
              pagination
              highlightOnHover
              striped
              responsive
              fixedHeader
              sortIcon={<IoMdArrowDown />}
              defaultSortFieldId={3} // default sort by Course Title
              actions={actionsMemo}
            />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete "${selectedCourse?.title}"?`}
      />
    </div>
  );
};

export default CourseList;

