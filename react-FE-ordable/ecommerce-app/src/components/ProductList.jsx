import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Item,
  Label,
  Loader,
  Message,
  Image,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Link } from "react-router-dom";

const ProductList = ({
  fetchedProducts,
  addItem,
  fetchProducts,
  loading,
  error,
  home,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (home) {
      setProducts(fetchedProducts.slice(0, 3));
    } else setProducts(fetchedProducts);
  }, [fetchedProducts]);

  if (loading) return <Loader active>Loading...</Loader>;
  if (error) return <Message error>{error}</Message>;
  return (
    <Segment>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2em" }}>
        Products
      </Header>
      <Grid container columns={3} stackable>
        {products.map((product) => (
          <Grid.Column key={product.id}>
            <Card>
              <Image src={product.image} wrapped ui={false} />
              <Card.Content>
                <Link to={`/products/${product.id}`}>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Description>{product.description}</Card.Description>
                  <Card.Meta>
                    <span className="price">${product.price}</span>
                  </Card.Meta>
                </Link>
              </Card.Content>
            </Card>
            <Card.Content extra>
              <Button onClick={() => addItem(product)} primary>
                Add to Cart
              </Button>
            </Card.Content>
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  fetchedProducts: state.products.products,
  loading: state.products.loading,
  error: state.products.error,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(actions.removeItem(id)),
  addItem: (product) => dispatch(actions.addItem(product)),
  fetchProducts: () => dispatch(actions.fetchProducts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
