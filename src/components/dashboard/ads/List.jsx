// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { AiOutlineEllipsis } from "react-icons/ai";
// import { IoMdArrowDown } from "react-icons/io";
// import { Link } from "react-router-dom";
// import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";
// import blogs from '../../../data/blogs.json';
// import { useGetPostsQuery } from "../../../store/features/post/postApi";

// const BlogList = () => {
//   // const [data, setData] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [dropdownOpenRow, setDropdownOpenRow] = useState(null);

//   const [data,isLoading] = useGetPostsQuery()

//   useEffect(() => {
//     setData(blogs);
//   }, []);

//   const handleDeleteClick = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//     setDropdownOpenRow(null);
//   };

//   const handleConfirmDelete = () => {
//     alert(`Deleted: ${selectedRow.title}`);
//     setShowModal(false);
//     setSelectedRow(null);
//   };

//   const filteredData = data.filter(
//     (row) =>
//       row.title.toLowerCase().includes(filterText.toLowerCase()) ||
//       row.category.toLowerCase().includes(filterText.toLowerCase()) ||
//       row.creator.name.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "#",
//       cell: (row, index) => index + 1,
//       width: "60px",
//     },
//     {
//       name: "Creator",
//       cell: (row) => (
//         <a href={row.creator.profileUrl} target="_blank" rel="noopener noreferrer">
//           <div className="d-flex align-items-center">
//             <img
//               src={row.creator.photo}
//               alt={row.creator.name}
//               width="50"
//               height="50"
//               className="img-fluid rounded-circle img-thumbnail me-2"
//             />
//             <div>
//               <div>{row.creator.name}</div>
//               <small className="text-muted">{row.creator.email}</small>
//             </div>
//           </div>
//         </a>
//       ),
//       grow: 2.5,
//     },
//     {
//       name: "Title",
//       cell: (row) => (
//         <div>
//           <a href={row.titleUrl} target="_blank" rel="noopener noreferrer">
//             {row.title}
//           </a>
//           <br />
//           <small className="text-muted">{row.date}</small>
//         </div>
//       ),
//       grow: 3,
//       sortable: true,
//     },
//     {
//       name: "Category",
//       selector: (row) => row.category,
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Status",
//       cell: (row) => (
//         <span className={`badge ${row.status === "Active" ? "bg-success" : "bg-secondary"}`}>
//           {row.status}
//         </span>
//       ),
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "Actions",
//       cell: (row, index) => (
//         <div className="dropdown-wrapper">
//           <button
//             type="button"
//             className="action-btn btn btn-sm btn-outline-primary btn-rounded"
//             onClick={() =>
//               setDropdownOpenRow(dropdownOpenRow === index ? null : index)
//             }
//           >
//             <AiOutlineEllipsis size={18} />
//           </button>

//           {dropdownOpenRow === index && (
//             <ul className="custom-dropdown">
//               <li>
//                 <Link to={`/dashboard/edit-ads/${row.id}`}>Edit</Link>
//               </li>
//               <li>
//                 <a href="#" onClick={() => handleDeleteClick(row)}>
//                   Delete
//                 </a>
//               </li>
//             </ul>
//           )}
//         </div>
//       ),
//       ignoreRowClick: true,
//       width: "120px",
//     },
//   ];

//   return (
//     <div className="container-fluid mt-4">
//       <div className="col-xl-12">
//         <div className="card box mb-3">
//           <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
//             <h4 className="page-title mb-0 d-flex align-items-center gap-2">
//               <i className="mdi mdi-apple-keyboard-command title_icon"></i> Ads
//             </h4>

//             <Link
//               to="/dashboard/create-bulk-ads"
//               className="btn btn-outline-primary btn-rounded"
//             >
//               <i className="mdi mdi-plus"></i> + Add  Bulk Post 
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="row row-cols-1 g-3 g-md-5">
//         <div className="col">
//           <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
//             <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
//               <button className="btn btn-secondary buttons-csv" type="button">
//                 Export as CSV
//               </button>

//               <div>
//                 <span>Search: </span>
//                 <input
//                   className="search-input"
//                   type="text"
//                   placeholder="Search blogs..."
//                   value={filterText}
//                   onChange={(e) => setFilterText(e.target.value)}
//                 />
//               </div>
//             </div>

//             <DataTable
//               columns={columns}
//               data={filteredData}
//               pagination
//               highlightOnHover
//               striped
//               responsive
//               fixedHeader
//               sortIcon={<IoMdArrowDown />}
//             />
//           </div>
//         </div>
//       </div>

//       <ConfirmDeleteModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         onConfirm={handleConfirmDelete}
//         title="Confirm Deletion"
//         message={`Are you sure you want to permanently delete "${selectedRow?.title}"?`}
//       />
//     </div>
//   );
// };

// export default BlogList;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";
import { useGetPostsQuery } from "../../../store/features/post/postApi";

const BlogList = () => {
  const { data: posts = [], isLoading } = useGetPostsQuery();

  const [filterText, setFilterText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dropdownOpenRow, setDropdownOpenRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    setDropdownOpenRow(null);
  };

  const handleConfirmDelete = () => {
    alert(`Deleted: ${selectedRow.title}`);
    setShowModal(false);
    setSelectedRow(null);
  };

  const filteredData = posts.filter((row) => {
    const title = row.title?.toLowerCase() || "";
    const cat = row.category?.name?.toLowerCase() || "";
    const creator = row.creator?.name?.toLowerCase() || ""; // OPTIONAL if creator exists

    return (
      title.includes(filterText.toLowerCase()) ||
      cat.includes(filterText.toLowerCase()) ||
      creator.includes(filterText.toLowerCase())
    );
  });

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "60px",
    },

    {
      name: "Title",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/view-ads/${row._id}`}>{row.title}</Link>
          <br />
          <small className="text-muted">{row.createdAt?.split("T")[0]}</small>
        </div>
      ),
      grow: 3,
      sortable: true,
    },

    {
      name: "Category",
      selector: (row) => row.category?.name || "—",
      sortable: true,
      width: "180px",
    },

    {
      name: "State",
      selector: (row) => row.state?.name || "—",
      width: "160px",
    },

    {
      name: "City",
      selector: (row) => row.city?.name || "—",
      width: "160px",
    },

    {
      name: "Area",
      selector: (row) => row.area?.name || "—",
      width: "160px",
    },

    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "active" ? "bg-success" : "bg-secondary"
          }`}
        >
          {row.status}
        </span>
      ),
      width: "120px",
    },

    {
      name: "Actions",
      cell: (row, index) => (
        <div className="dropdown-wrapper">
          <button
            type="button"
            className="action-btn btn btn-sm btn-outline-primary btn-rounded"
            onClick={() =>
              setDropdownOpenRow(dropdownOpenRow === index ? null : index)
            }
          >
            <AiOutlineEllipsis size={18} />
          </button>

          {dropdownOpenRow === index && (
            <ul className="custom-dropdown">
              <li>
                <Link to={`/dashboard/edit-ads/${row._id}`}>Edit</Link>
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
      width: "120px",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="col-xl-12">
        <div className="card box mb-3">
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="page-title mb-0 d-flex align-items-center gap-2">
              <i className="mdi mdi-apple-keyboard-command title_icon"></i> Ads
            </h4>

            <Link
              to="/dashboard/create-bulk-ads"
              className="btn btn-outline-primary btn-rounded"
            >
              <i className="mdi mdi-plus"></i> + Add Bulk Post
            </Link>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 g-3 g-md-5">
        <div className="col">
          <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
              <button className="btn btn-secondary buttons-csv" type="button">
                Export as CSV
              </button>

              <div>
                <span>Search: </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search ads..."
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
        message={`Are you sure you want to permanently delete "${selectedRow?.title}"?`}
      />
    </div>
  );
};

export default BlogList;

