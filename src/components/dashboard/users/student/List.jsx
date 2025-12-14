import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../../common/ConfirmDeleteModal";

// ✅ Import local JSON

import students from "../../../../data/students.json";

const List = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dropdownOpenRow, setDropdownOpenRow] = useState(null);

  useEffect(() => {
    // Load local JSON
    setData(students);
  }, []);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    setDropdownOpenRow(null);
  };

  const handleConfirmDelete = () => {
    alert(`Deleted: ${selectedRow.name}`);
    setShowModal(false);
    setSelectedRow(null);
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(filterText.toLowerCase()) ||
      row.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Photo",
      cell: (row) => (
        <img
          src={row.photo}
          alt={row.name}
          width="50"
          height="50"
          className="img-fluid rounded-circle img-thumbnail"
        />
      ),
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      wrap: true,
      width: "150px",
    },
    {
      name: "Enrolled Courses",
      cell: (row) =>
        row.enrolledCourses.length > 0 ? (
          <ul className="mb-0">
            {row.enrolledCourses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        ) : (
          <em>None</em>
        ),
      wrap: true,
      grow: 3,
      style: {
        padding: "15px", // Add padding to entire column cells
      },
    },

   {
  name: "Actions",
  cell: (row, index) => (
    <div className="dropdown-wrapper">
      <button
        type="button"
        className="action-btn"
        onClick={() =>
          setDropdownOpenRow(dropdownOpenRow === index ? null : index)
        }
      >
        <AiOutlineEllipsis size={18} />
      </button>

      {dropdownOpenRow === index && (
        <ul className="custom-dropdown">
          <li>
            <a href={`/dashboard/edit-student/${row.id}`}>Edit</a>
          </li>
          <li>
            <a href="#" onClick={() => handleDeleteClick(row)}>
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
  width: "150px",
}

  ];

  return (
    <div className="container-fluid mt-4">

       <div className="col-xl-12">
          <div className="card box mb-3">
            <div className="card-body  box-body py-2 d-flex justify-content-between align-items-center flex-wrap">
              {/* Left: Title */}
              <h4 className="page-title mb-0 d-flex align-items-center gap-2">
                <i className="mdi mdi-apple-keyboard-command title_icon"></i> Student
              </h4>
      
              {/* Right: Add Button */}
              <Link
                to="/dashboard/add-student"
                className="btn btn-outline-primary btn-rounded"
              >
                <i className="mdi mdi-plus"></i> + Add Student
              </Link>
            </div>
          </div>
        </div>

      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
              <button class="btn btn-secondary buttons-csv" tabindex="0" aria-controls="course-datatable-server-side" type="button"><span>Export as CSV</span></button>

              <div>
                <span>Search: </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search users..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>

            </div>

            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              striped
              responsive
              fixedHeader
              sortIcon={<IoMdArrowDown />}
            />
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete "${selectedRow?.name}"?`}
      />
    </div>
  );
};

export default List;
