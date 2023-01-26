import axios from "../axios";
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import {
  Badge,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import "react-alice-carousel/lib/alice-carousel.css";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

const ProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      console.log(data.product);
      setProduct(data.product);
      console.log(data.similar);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="product-carousel-image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    console.log(similar);
    similarProducts = similar.map((product, index) => (
      <div className="item" data-value={index}>
        <SimilarProduct {...product} key={index} />
      </div>
    ));
  }

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product-price">{product.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong>
            {product.description}
          </p>
          {user && !user.admin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Select>
              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Add To Cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Added To Cart"
              body={`${product.name} is in your cart `}
            />
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap"></div>
        <AliceCarousel
          mouseTracking
          items={similarProducts}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>
    </Container>
  );
};

export default ProductPage;
