// CartDropdown.js
import React from "react";
import { Dropdown, Icon, Button, List, Image } from "semantic-ui-react";

const CartDropdown = ({ cartItems, handleRemoveFromCart, handleCheckout }) => {
  const renderCartItems = () => {
    return cartItems.length > 0 ? (
      <List
        divided
        relaxed
        style={{
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {cartItems.map((item) => (
          <List.Item
            key={item.id}
            style={{
              width: "150px",
            }}
          >
            <Image avatar src={item.image} />
            <List.Content
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <List.Content>
                <List.Header>{item.name}</List.Header>
                <List.Description>
                  {item.quantity} x ${item.price}
                </List.Description>
              </List.Content>
              <Icon
                name="trash"
                color="red"
                onClick={() => handleRemoveFromCart(item.id)}
                style={{ cursor: "pointer" }}
              />
            </List.Content>
          </List.Item>
        ))}
      </List>
    ) : (
      <p>Your cart is empty.</p>
    );
  };

  return (
    <Dropdown text={`${cartItems?.length || 0}`} item icon="cart" simple>
      <Dropdown.Menu>
        <Dropdown.Header icon="cart" content="Your Cart" />
        <Dropdown.Divider />
        {renderCartItems()}
        {cartItems.length > 0 && (
          <>
            <Dropdown.Divider />
            <Button primary fluid onClick={handleCheckout}>
              Checkout
            </Button>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CartDropdown;
