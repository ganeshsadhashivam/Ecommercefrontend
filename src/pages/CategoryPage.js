import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import axios from "../axios";
import "./CategoryPage.css";
let count = 0;
const CategoryPage = () => {
  const { category } = useParams();
  console.log(category);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then((data) => {
        setLoading(false);
        console.log(data);
        setProduct(data.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }

  console.log(product);
  console.log(searchTerm);
  console.log(
    product.filter((p) =>
      console.log(p.category.toLowerCase().includes("phones".toLowerCase()))
    )
  );
  const productsSearch =
    // const { data } = products;
    // product.filter((p) =>
    //   //  p.name.toLowerCase().includes(searchTerm.toLowerCase())
    //   p.category.toLowerCase().includes(searchTerm.toLowerCase())
    product.filter((p) =>
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  console.log(typeof productsSearch);
  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {console.log(productsSearch.length)}
      {productsSearch.length === 0 ? (
        <h1>No Products to show</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {productsSearch.map((product) => (
                  <ProductPreview {...product} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default CategoryPage;
