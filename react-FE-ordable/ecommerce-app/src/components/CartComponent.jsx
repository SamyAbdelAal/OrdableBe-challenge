import React from "react";
import { Button, List, Container, Header, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import CartDropdown from "./CartComp";
import { useNavigate } from "react-router-dom";

const CartComponent = ({ cart, removeItem }) => {
  const navigate = useNavigate(); // React Router v6 hook

  const handleRemoveFromCart = (itemId) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Menu inverted>
      <Menu.Menu position="right">
        <CartDropdown
          cartItems={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCheckout={handleCheckout}
        />
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});
const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(actions.removeItem(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
