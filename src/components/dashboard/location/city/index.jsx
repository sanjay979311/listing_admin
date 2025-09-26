


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Table,
    Button,
    Spinner,
    Container,
    Card,
    Pagination,
    Form,
    InputGroup,
    Badge,
    Modal,
    Row,
    Col
} from "react-bootstrap";
import {
    useGetCityQuery,
    useDeleteCityMutation
} from "../../../../store/features/location/city/cityApi";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { FaCity } from "react-icons/fa";

const CityList = () => {
    const { data: cities, isLoading, isFetching, error, refetch } = useGetCityQuery();
    const [deleteCity] = useDeleteCityMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        refetch();
    }, [refetch]);

    // Filter cities based on search input
    const filteredCities = cities?.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination calculations
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
    const currentItems = filteredCities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Delete city handler
    const handleDelete = async (id) => {
        setShowDeleteModal(false);
        try {
            await deleteCity(id).unwrap();
            toast.success("City deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Failed to delete city: " + error.message);
        }
    };

    const openDeleteModal = (id) => {
        setCityToDelete(id);
        setShowDeleteModal(true);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading cities...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-5">
                <div className="alert alert-danger mx-3">
                    <i className="fa fa-exclamation-circle me-2"></i>
                    Error loading cities: {error.message}
                </div>
                <Button variant="primary" onClick={refetch} className="mt-3">
                    <i className="fa fa-refresh me-2"></i> Try Again
                </Button>
            </div>
        );
    }

    return (
        <Container fluid className="px-lg-4 py-3">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            <Row className="align-items-center mb-4">
                <Col md={6}>
                    <h2 className="mb-0 d-flex align-items-center">
                        <FaCity className="me-2 text-primary" />
                        <span>City Management</span>
                    </h2>
                    <p className="text-muted small mb-0 mt-1">Manage your city listings</p>
                </Col>
                <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <Link to="/dashboard/add-city" className="btn btn-primary">
                        <FiPlus className="me-2" /> Add New City
                    </Link>
                </Col>
            </Row>

            {/* Search and Stats Card */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-3 mb-md-0">
                            <InputGroup>
                                <InputGroup.Text className="bg-white">
                                    <FiSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search cities, states, or countries..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="border-start-0"
                                />
                                {searchTerm && (
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setSearchTerm("")}
                                        className="d-flex align-items-center"
                                    >
                                        <FiX />
                                    </Button>
                                )}
                            </InputGroup>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <Badge bg="light" text="dark" className="fs-6 p-2">
                                Total Cities: {filteredCities.length}
                            </Badge>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Main Table Card */}
            <Card className="border-0 shadow-sm">
                <div className="table-responsive">
                    <Table hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th width="5%">#</th>
                                <th width="25%">City Name</th>
                                <th width="25%">State</th>
                                <th width="25%">Country</th>
                                <th width="20%" className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((city, i) => (
                                    <tr key={city._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td>
                                            <strong>{city.name}</strong>
                                        </td>
                                        <td>{city.state?.name || <span className="text-muted">N/A</span>}</td>
                                        <td>{city.country?.name || <span className="text-muted">N/A</span>}</td>
                                        <td className="text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Link
                                                    to={`/dashboard/edit-city/${city._id}`}
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 />
                                                </Link>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => openDeleteModal(city._id)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <div className="py-4">
                                            {searchTerm ? (
                                                <>
                                                    <FiSearch size={24} className="text-muted mb-2" />
                                                    <p>No cities found matching your search</p>
                                                    <Button
                                                        variant="link"
                                                        onClick={() => setSearchTerm("")}
                                                        className="text-primary"
                                                    >
                                                        Clear search
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCity size={24} className="text-muted mb-2" />
                                                    <p>No cities available</p>
                                                    <Link to="/dashboard/add-city" className="btn btn-sm btn-primary mt-2">
                                                        Add Your First City
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Card.Footer className="bg-white border-0">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div className="text-muted small mb-2 mb-md-0">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, filteredCities.length)} of{" "}
                                {filteredCities.length} entries
                            </div>
                            <Pagination className="mb-0">
                                <Pagination.First
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </div>
                    </Card.Footer>
                )}

                {isFetching && !isLoading && (
                    <Card.Footer className="bg-light py-2">
                        <div className="d-flex align-items-center text-muted">
                            <Spinner animation="border" size="sm" className="me-2" />
                            <small>Updating data...</small>
                        </div>
                    </Card.Footer>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-2">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    Are you sure you want to delete this city? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(cityToDelete)}>
                        Delete City
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CityList;