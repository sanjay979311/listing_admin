

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useAddBannerMutation, 
  useUpdateBannerMutation, 
  useGetBannerByIdQuery 
} from '../../../store/features/banner/bannerApi';
import { Form, Button, Container, Spinner, Card, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const { data: banner, isLoading: isFetching } = useGetBannerByIdQuery(id, { skip: !isEdit });

  // Set form values if editing
  useEffect(() => {
    if (isEdit && banner) {
      setTitle(banner.title);
      setDescription(banner.description);
      if (banner.image) setImagePreview(banner.image);
    }
  }, [banner, isEdit]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      if (isEdit) {
        await updateBanner({ id, formData }).unwrap();
        toast.success('Banner updated successfully!');
      } else {
        await addBanner(formData).unwrap();
        toast.success('Banner added successfully!');
      }
      setTimeout(() => navigate('/dashboard/banner-list'), 1000);
    } catch (error) {
      toast.error(error?.data?.message || 'Error saving banner!');
      console.error('Error saving banner:', error);
    }
  };

  if (isEdit && isFetching) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Loading banner data...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-center mb-4">{isEdit ? 'Edit' : 'Add'} Banner</h2>
      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter banner title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter banner description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div className="mt-3 position-relative">
                <Image src={imagePreview} alt="Banner Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 start-0 translate-middle"
                  onClick={handleRemoveImage}
                  style={{ borderRadius: '50%' }}
                >
                  &times;
                </Button>
              </div>
            )}
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={isAdding || isUpdating}>
              {isAdding || isUpdating ? <Spinner animation="border" size="sm" /> : isEdit ? 'Update Banner' : 'Add Banner'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard/banner-list')}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default BannerForm;
