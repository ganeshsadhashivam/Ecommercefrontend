import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import axios from "../axios";

const CategoryPage = () => {
  const { category } = useParams();
  console.log(category);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then((data) => {
        setLoading(false);
        console.log(data);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }

  const productsSearch = Object.keys(products).filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(productsSearch);
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
      {productsSearch.length === 0 ? (
        <h1>No Products to show</h1>
      ) : (
        <Container>
          {productsSearch.map((product) => (
            <ProductPreview {...product} />
          ))}
        </Container>
      )}
    </div>
  );
};

export default CategoryPage;
