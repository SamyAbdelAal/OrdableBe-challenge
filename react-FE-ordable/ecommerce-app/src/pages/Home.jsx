import React from "react";
import {
  Container,
  Header,
  Image,
  Button,
  Card,
  Segment,
  Grid,
} from "semantic-ui-react";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a description for product 1.",
    price: "20.00",
    image: "http://localhost:8000/media/products/product1.webp",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a description for product 2.",
    price: "10.00",
    image: "http://localhost:8000/media/products/product2.webp",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a description for product 3.",
    price: "15.00",
    image: "http://localhost:8000/media/products/product3.webp",
  },
];

const HomeScreen = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Segment
        inverted
        textAlign="center"
        style={{ padding: "50px", alignSelf: "center", width: "100%" }}
      >
        <Header as="h1" style={{ fontSize: "4em" }}>
          Welcome to Our Store
        </Header>
        <Header as="h2" style={{ fontSize: "2em" }}>
          Discover amazing products at great prices!
        </Header>
        <Button href="/products" primary size="huge">
          Shop Now
        </Button>
      </Segment>

      {/* Featured Products Section */}

      <Header as="h2" textAlign="center">
        Featured Products
      </Header>
      <Grid columns={3} stackable>
        <ProductList home={true} />
      </Grid>
    </Container>
  );
};

export default HomeScreen;
