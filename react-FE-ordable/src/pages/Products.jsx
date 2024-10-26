import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import ProductList from "../components/ProductList";
import "./styles.css";

const ProductPage = () => {
  return (
    <div>
      <Container>
        <Header as="h1" inverted>
          Product Store
        </Header>
      </Container>

      <Container style={{ margin: "2em 0" }}>
        <ProductList />
      </Container>
    </div>
  );
};

export default ProductPage;
