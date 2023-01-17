import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import { Row, Col } from "react-bootstrap";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dafqu2slg/image/upload/v1673935206/Shop_Quality_Products_1_odc6fy.png"
        alt="banner image"
        width="100%"
      />
      <div className="featured-products-container container mt-4">
        <h2>Lastest Products</h2>
        {/*last products */}
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
        {/*sale  banner */}
        {/* <img
          src="https://res.cloudinary.com/dafqu2slg/image/upload/v1673939302/Big_SALE_50_bij6xw.png"
          about="banner image"
          width="100%"
        /> */}
      </div>
      <div className="sale-banner-container mt-4">
        <img
          src="https://res.cloudinary.com/dafqu2slg/image/upload/v1673939302/Big_SALE_50_bij6xw.png"
          alt=""
          width="100%"
        />
      </div>
      <div className="recent-products-container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4} key={category.id}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
