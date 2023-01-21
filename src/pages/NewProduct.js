import React from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import "./NewProduct.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, isLoading, isSuccess, error }] =
    useCreateProductMutation();

  //For Remove Image
  const handleRemoveImage = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id != imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please Fill out All the Fields");
    }
    createProduct({ name, description, price, category, images }).then(
      (data) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  };

  //For Showimage Widget
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dafqu2slg",
        uploadPreset: "ckwhf5qi",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6} className="new-product-form-container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a Product</h1>
            {isSuccess && (
              <Alert variant="danger">Product created with success</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (₹)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button onClick={showWidget}>Upload Images</Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    <i
                      className="fa fa-times-circle"
                      onClick={handleRemoveImage}
                    ></i>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product-image-container"></Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
