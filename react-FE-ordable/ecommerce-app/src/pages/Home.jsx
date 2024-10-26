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
