import React, { useEffect } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartComponent from "../components/CartComponent";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";
const MainContainer = ({
  authorized,
  cart,
  loading,
  logout,

  children,
  history,
}) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100%",
        alignContent: "center",
      }}
    >
      <Menu inverted>
        <Container>
          <Link to="/">
            <Menu.Item header>Home</Menu.Item>
          </Link>
          <Link to="/products/">
            <Menu.Item header>Products</Menu.Item>
          </Link>
          {!localStorage.getItem("accessToken") ? (
            <Menu.Menu position="right">
              <Link to="/login">
                <Menu.Item header>Login</Menu.Item>
              </Link>
              <Link to="/signup">
                <Menu.Item header>Signup</Menu.Item>
              </Link>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Link to="/orders">
                <Menu.Item>Orders</Menu.Item>
              </Link>
              <Menu.Item header onClick={() => logout(navigate)}>
                Logout
              </Menu.Item>
            </Menu.Menu>
          )}
          <Menu.Menu>
            <CartComponent />
          </Menu.Menu>
        </Container>
      </Menu>
      {children}
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 1" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 2" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 3" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="Footer Header" />
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  cart: state.cart.cart,
  loading: state.cart.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch({ type: "FETCH_CART" }),
  logout: (navigate) => dispatch(actions.logoutUser(navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
