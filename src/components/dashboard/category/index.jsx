;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

 import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../../store/features/category/categoryApi";
import BASE_URL from "../../../utils/imageConfig";
import { IoMdArrowDown } from "react-icons/io";

const CategoryList = () => {
  const { data: categories, isLoading, error, refetch } = useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (refetch) refetch();
  }, [refetch]);

  // ✅ Filter categories
  const filteredCategory = categories?.filter((category) =>
    category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Paginate
  const currentItems = filteredCategory?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Open confirmation modal
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  // ✅ Confirm deletion
  const handleConfirmDelete = async () => {
    if (!selectedRow) return;
    try {
      await deleteCategory(selectedRow._id).unwrap();
      toast.success(`Category "${selectedRow.name}" deleted successfully!`, { position: "top-center" });
      setShowModal(false);
      setSelectedRow(null);
      refetch();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete category.", { position: "top-center" });
    }
  };

  // ✅ DataTable Columns
  const columns = [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image ? row.image : "/default-img.png"}
          alt={row.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            objectFit: "cover",
            padding: "5px",
          }}
        />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            to={`/dashboard/edit-category/${row._id}`}
            className="btn btn-sm btn-primary"
          >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteClick(row)}
          >
            Delete
          </button>
        </div>
      ),
      width: "160px",
    },
  ];

  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          Failed to load categories. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid mt-4">
        <div className="row row-cols-1 g-3 g-md-5">
          <div className="col">
            <div className="bg-white px-4 py-5 rounded-3 shadow-sm">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
                <Link to="/dashboard/add-category" className="btn btn-primary">
                  + Add Category
                </Link>
                <input
                  className="form-control w-50 rounded-pill"
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Data Table */}
              <DataTable
                columns={columns}
                data={currentItems}
                pagination
                highlightOnHover
                striped
                responsive
                fixedHeader
                sortIcon={<IoMdArrowDown />}
                noDataComponent={
                  <div className="text-center py-4">No categories found</div>
                }
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

export default CategoryList;
