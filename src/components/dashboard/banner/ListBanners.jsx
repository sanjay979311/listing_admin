

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { useGetBannersQuery, useDeleteBannerMutation } from "../../../store/features/banner/bannerApi";
import BASE_URL from "../../../utils/imageConfig";
import { IoMdArrowDown } from "react-icons/io";
const Banner = () => {
    // Fetch banner data

    const { data: banners, isLoading, error, refetch } = useGetBannersQuery();
    const [deleteBanner] = useDeleteBannerMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // console.log("banner is =======>", banners)

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])

    // Filter banners based on search input
    const filteredBanners = banners?.filter((banner) =>
        banner?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const currentItems = filteredBanners?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle banner deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(id).unwrap();
                toast.success(`Banner with ID ${id} deleted successfully!`);
                refetch(); // Refetch banners after deletion
            } catch (error) {
                toast.error("Failed to delete the banner.");
            }
        }
    };

    // Columns for the DataTable
    const columns = [
        {
            name: "#",
            selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
        },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={`${BASE_URL}${row?.image || "/default-img.png"}`}
                    alt={row.name}
                    style={{
                        borderRadius: "8px",
                        width: "50px",
                        height: "50px",
                        marginTop: "5px",
                        marginBottom: "5px",
                    }}
                />
            ),
        },

        {
            name: "Name",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Link to={`/dashboard/edit-banner/${row._id}`} className="btn btn-sm btn-primary">
                        Edit
                    </Link>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
            width: "150px", // Fixed width for the Actions column
        },
    ];

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger" role="alert">
                    Failed to load banners. Please try again later.
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
                            {/* Header: Add Course + Search */}
                            <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
                                <Link to="/dashboard/add-banner" className="btn btn-primary">
                                    + Add Banner
                                </Link>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search banners..."
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
                                defaultSortFieldId={3} // default sort by Course Title
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container-fluid">
                <div className="row row-cols-1 g-3 g-md-5">
                    <div className="col">
                        <div className="bg-white px-4 py-5 rounded-3">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link to="/dashboard/add-banner" className="btn btn-primary">
                                    + Add Banner
                                </Link>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search banners..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <DataTable
                                columns={columns}
                                data={currentItems}
                                pagination
                                paginationServer
                                paginationTotalRows={filteredBanners?.length}
                                paginationPerPage={itemsPerPage}
                                paginationDefaultPage={currentPage}
                                onChangePage={setCurrentPage}
                                noDataComponent={<div className="text-center py-4">No banners found</div>}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            backgroundColor: "#f8f9fa",
                                            fontWeight: "bold",
                                        },
                                    },
                                    rows: {
                                        style: {
                                            "&:hover": {
                                                backgroundColor: "#f1f1f1",
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Banner;