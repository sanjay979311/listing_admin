



// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";

// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Link } from "react-router";

// const CourseList = () => {
//     const [courses, setCourses] = useState([]);
//     const [filterText, setFilterText] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     // Fetch Data
//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//             .then((res) => res.json())
//             .then((data) => setCourses(data))
//             .catch((err) => console.error(err));
//     }, []);

//     // Actions
//     const handleEdit = (course) => alert(`Edit: ${course.title}`);
//     const handleDelete = (course) => alert(`Delete: ${course.title}`);

//     // Columns
//     const columns = [
//         { name: "ID", selector: row => row.id, sortable: true, width: "70px" },
//         { name: "Course Title", selector: row => row.title, sortable: true, wrap: true, grow: 2 },
//         { name: "Description", selector: row => row.body, wrap: true, grow: 3 },
//         { name: "User ID", selector: row => row.userId, sortable: true, width: "100px" },
//         {
//             name: "Actions",
//             cell: row => (
//                 <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-primary rounded-pill d-flex align-items-center gap-1" onClick={() => handleEdit(row)}>
//                         <FaEdit /> Edit
//                     </button>
//                     <button className="btn btn-sm btn-danger rounded-pill d-flex align-items-center gap-1" onClick={() => handleDelete(row)}>
//                         <FaTrash /> Delete
//                     </button>
//                 </div>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//             width: "180px",
//         },
//     ];

//     // Filtered Data
//     const filteredCourses = courses.filter(
//         course =>
//             course.title.toLowerCase().includes(filterText.toLowerCase()) ||
//             course.body.toLowerCase().includes(filterText.toLowerCase())
//     );

//     // Custom styles
//     const customStyles = {
//         headCells: { style: { fontWeight: "600", fontSize: "14px", backgroundColor: "#f8f9fa", color: "#212529", textTransform: "uppercase", borderBottom: "2px solid #dee2e6" } },
//         rows: { style: { fontSize: "14px", minHeight: "55px", } },
//         pagination: { style: { borderTop: "1px solid #dee2e6", padding: "12px", justifyContent: "space-between", marginTop: "30px" } },
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row row-cols-1 g-3 g-md-5">
//                     <div className="col">
//                         <div className="bg-white px-4 py-5 rounded-3">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <Link to="/dashboard/add-banner" className="btn btn-primary">
//                                     + Add Course
//                                 </Link>
//                                 <input
//                                     className="form-control w-50"
//                                     type="text"

//                                     placeholder="Search Items..."
//                                     value={filterText}
//                                     onChange={(e) => setFilterText(e.target.value)}
//                                 />
//                             </div>


//                             <div className="card-body">
//                                 <DataTable
//                                     columns={columns}
//                                     data={filteredCourses}
//                                     pagination
//                                     highlightOnHover
//                                     striped
//                                     responsive
//                                     fixedHeader
//                                     customStyles={customStyles}
//                                 />
//                             </div>

//                         </div>
//                     </div>


//                 </div>
//             </div>

           
//         </>

//     );
// };

// export default CourseList;



import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Fetch Data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  // Actions
  const handleEdit = (course) => alert(`Edit: ${course.title}`);
  const handleDelete = (course) => alert(`Delete: ${course.title}`);

  // Filtered Data
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(filterText.toLowerCase()) ||
      course.body.toLowerCase().includes(filterText.toLowerCase())
  );

  // Columns
  const columns = [
    {
      name: "ID",
      cell: (row) => filteredCourses.indexOf(row) + 1,
      width: "70px",
      sortable: false,
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
      name: "Course Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Description",
      selector: (row) => row.body,
      wrap: true,
      grow: 3,
    },
    {
      name: "User ID",
      selector: (row) => row.userId,
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary rounded-pill d-flex align-items-center gap-1"
            onClick={() => handleEdit(row)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="btn btn-sm btn-danger rounded-pill d-flex align-items-center gap-1"
            onClick={() => handleDelete(row)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "180px",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            {/* Header: Add Course + Search */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
              <Link to="/dashboard/add-course" className="btn btn-primary">
                + Add Course
              </Link>
              <input
                className="form-control w-50 rounded-pill"
                type="text"
                placeholder="🔍 Search courses..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
