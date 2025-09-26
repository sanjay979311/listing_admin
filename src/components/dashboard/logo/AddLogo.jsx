


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddLogoMutation } from '../../../store/features/logo/logoApi';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddLogoForm = () => {
    const navigate = useNavigate();
    const [addLogo, { isLoading }] = useAddLogoMutation();

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

    // Handle image selection
    const handleImageChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setPreviewImg(null);
        setImage(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('image', image);

        try {
            await addLogo(formData).unwrap();
            toast.success('Logo added successfully!');
            setTimeout(() => navigate('/dashboard/logo-list'), 1000);
        } catch (error) {
            toast.error(error.data?.error || 'Error adding logo!');
            console.error('Error adding logo:', error);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Add Logo</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row row-cols-1">
                    {/* Image Upload Section */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <h6>Featured Image</h6>
                                    <p className="text-secondary">Upload your image here. Max size: 2 MB</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <label className="w-100">
                                                <div className="border border-2 text-center p-3" style={{ cursor: 'pointer' }}>
                                                    <p style={{ fontSize: '14px' }}>
                                                        <span className="text-color-1 fw-medium">Upload an image</span> or drag and drop
                                                    </p>
                                                    <input type="file" hidden onChange={handleImageChange} />
                                                </div>
                                            </label>

                                            {previewImg && (
                                                <>
                                                    <img src={previewImg} alt="Preview" style={{ width: '100px', height: '100px' }} />
                                                    <button type="button" onClick={handleRemoveImage} className="btn btn-outline-primary" style={{ marginLeft: '10px' }}>
                                                        Remove
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <h6>Logo Name</h6>
                                    <p className="text-secondary">Enter the logo name below</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <label className="form-label fw-medium">Logo Name *</label>
                                            <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit & Back Buttons */}
                    <div className="col sticky-bottom">
                        <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                            <div className="row">
                                <div className="col-auto">
                                    <button className="btn btn-outline-primary btn-lg fw-semibold" onClick={() => navigate('/dashboard/logo-list')}>
                                        Back
                                    </button>
                                </div>
                                <div className="col-auto ms-auto">
                                    <button className="btn btn-primary btn-lg fw-semibold" type="submit" disabled={isLoading}>
                                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Add Logo'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddLogoForm;
