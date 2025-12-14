



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubCategories, deleteSubCategory, resetDeleteStatus } from '../../../store/reducers/subCategoryReducer';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Spinner, Alert, Container, Form } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import DataTable from 'react-data-table-component';
// import { IoMdArrowDown } from "react-icons/io";

// const SubCategoryList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items, status, deleteStatus, error } = useSelector(state => state.subCategories);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     // Fetch sub-categories on component mount
//     useEffect(() => {
//         dispatch(fetchSubCategories());
//     }, [dispatch]);

//     // Show toast messages based on deleteStatus
//     useEffect(() => {
//         if (deleteStatus === 'succeeded') {
//             toast.success('Sub-category deleted successfully!');
//             dispatch(resetDeleteStatus());
//         } else if (deleteStatus === 'failed') {
//             toast.error('Failed to delete sub-category!');
//             dispatch(resetDeleteStatus());
//         }
//     }, [deleteStatus, dispatch]);

//     // Handle delete action
//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this sub-category?')) {
//             try {
//                 await dispatch(deleteSubCategory(id)).unwrap();
//             } catch (error) {
//                 console.error('Failed to delete sub-category:', error);
//             }
//         }
//     };

//     // Filter sub-categories based on search input
//     const filteredItems = items?.filter(item =>
//         item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination calculations
//     const currentItems = filteredItems?.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Columns for the DataTable
//     const columns = [
//         {
//             name: '#',
//             selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
//             sortable: true,
//         },
//         {
//             name: 'Name',
//             selector: row => row.name,
//             sortable: true,
//         },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                     <Link to={`/dashboard/edit-sub-category/${row._id}`} className="btn btn-sm btn-primary">
//                         Edit
//                     </Link>
//                     <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(row._id)}
//                         disabled={deleteStatus === 'loading'}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//             width: '150px', // Fixed width for the Actions column
//         },
//     ];

//     // Loading state
//     if (status === 'loading') {
//         return (
//             <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="text-center py-5">
//                 <div className="alert alert-danger" role="alert">
//                     Failed to load sub-categories. Please try again later.
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ToastContainer />
//            <div className="container-fluid mt-4">
//                 <div className="row row-cols-1 g-3 g-md-5">
//                     <div className="col">
//                         <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
//                             {/* Header: Add Course + Search */}
//                             <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
//                                  <Button
//                                     variant="primary"
//                                     onClick={() => navigate('/dashboard/add-sub-category')}
//                                 >
//                                     + Add Sub-Category
//                                 </Button>
//                                 <input
//                                     className="form-control w-50 rounded-pill"
//                                     type="text"
//                                    placeholder="Search Sub categories..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
                                    
//                                 />
//                             </div>

//                             {/* Data Table */}
//                             <DataTable
//                                 columns={columns}
//                                 data={currentItems}
//                                 pagination
//                                 highlightOnHover
//                                 striped
//                                 responsive
//                                 fixedHeader
//                                 sortIcon={<IoMdArrowDown />}
//                                 defaultSortFieldId={3} // default sort by Course Title
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SubCategoryList;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubCategories,
  deleteSubCategory,
  resetDeleteStatus,
} from "../../../store/reducers/subCategoryReducer";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { IoMdArrowDown } from "react-icons/io";
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";

const SubCategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, deleteStatus, error } = useSelector(
    (state) => state.subCategories
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const itemsPerPage = 10;

  const BASE_IMAGE_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/uploads/`;

  // ✅ Fetch subcategories
  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  // ✅ Toasts for delete status
  useEffect(() => {
    if (deleteStatus === "succeeded") {
      toast.success("Sub-category deleted successfully!", { position: "top-center" });
      dispatch(resetDeleteStatus());
    } else if (deleteStatus === "failed") {
      toast.error("Failed to delete sub-category!", { position: "top-center" });
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus, dispatch]);

  // ✅ Delete logic
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;
    try {
      await dispatch(deleteSubCategory(selectedRow._id)).unwrap();
      setShowModal(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete sub-category!", { position: "top-center" });
    }
  };

  // ✅ Search filter
  const filteredItems = items?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Table Columns
  const columns = [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
      width: "70px",
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          {row.image ? (
            <img
              src={`${BASE_IMAGE_URL}${row.image}`}
              alt={row.name}
              style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            objectFit: "cover",
            padding: "5px",
          }}
              onError={(e) => {
                e.target.src = "/no-image.jpg"; // fallback image
              }}
            />
          ) : (
            <div
               style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            objectFit: "cover",
            padding: "5px",
          }}
            >
             
            </div>
          )}
        </div>
      ),
      width: "90px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Category",
      selector: (row) => row.category?.name || "—",
      sortable: true,
      wrap: true,
    },
    {
      name: "Created On",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      sortable: true,
      width: "140px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Link
            to={`/dashboard/edit-sub-category/${row._id}`}
            className="btn btn-sm btn-primary"
          >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteClick(row)}
            disabled={deleteStatus === "loading"}
          >
            Delete
          </button>
        </div>
      ),
      width: "180px",
    },
  ];

  // ✅ Loading UI
  if (status === "loading") {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          Failed to load sub-categories. Please try again later.
        </div>
      </div>
    );
  }

  // ✅ Main Render
  return (
    <>
      <ToastContainer />
      <div className="container-fluid mt-4">
        <div className="row row-cols-1 g-3 g-md-5">
          <div className="col">
            <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
              {/* ✅ Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
                <Button
                  variant="primary"
                  onClick={() => navigate("/dashboard/add-sub-category")}
                >
                  + Add Sub-Category
                </Button>
                <input
                  className="form-control w-50 rounded-pill"
                  type="text"
                  placeholder="Search sub-categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* ✅ DataTable */}
              <DataTable
                columns={columns}
                data={currentItems}
                pagination
                highlightOnHover
                striped
                responsive
                fixedHeader
                sortIcon={<IoMdArrowDown />}
                noDataComponent={<div className="text-center py-4">No sub-categories found</div>}
              />
            </div>
          </div>
        </div>

        {/* ✅ Delete Confirmation Modal */}
        <ConfirmDeleteModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to permanently delete "${selectedRow?.name}"?`}
        />
      </div>
    </>
  );
};

export default SubCategoryList;
