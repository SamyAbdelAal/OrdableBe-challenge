import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Table,
} from "semantic-ui-react";
import * as actions from "../store/actions";
// Sample cart data for demonstration

const Checkout = ({
  cartItems,
  createOrder,
  fetchPaymentMethods,
  paymentMethods,
}) => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  useEffect(() => {
    fetchPaymentMethods();
  }, []);
  const handleInputChange = (e) => {
    console.log(`🚀 ~ handleInputChange ~ e:`, e);
    const { name, value } = e.target;

    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  const handleOrder = () => {
    let orderItems = cartItems.map((item) => ({
      ...item,
      product: item.id,
      selected_options: item.options,
      price_at_purchase: item.price,
    }));
    console.log(
      "orderItems",
      JSON.stringify(
        {
          items: orderItems,
          customer_name: shippingInfo.firstName + " " + shippingInfo.lastName,
          customer_email: shippingInfo.email,
        },
        null,
        2
      )
    );
    createOrder({
      items: orderItems,
      customer_name: shippingInfo.firstName + " " + shippingInfo.lastName,
      customer_email: shippingInfo.email,
    });
  };
  console.log("shippingInfo", JSON.stringify(shippingInfo, null, 2));

  return (
    <Container style={{ padding: "2em 0" }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: "1.5em" }}>
        Checkout
      </Header>

      <Segment>
        <Header as="h3">Order Summary</Header>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cartItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell singleLine={false}>
                  {item.options?.map((opt) => opt.value).join(", ")}
                </Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>${item.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Divider />
        <Header as="h4">Total: ${calculateTotal()}</Header>
      </Segment>

      {/* Shipping Information */}
      <Segment style={{ marginTop: "2em" }}>
        <Header as="h3">Shipping Information</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
          />
          <Form.Input
            label="Address"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="City"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="postalCode"
              label="Postal Code"
              placeholder="Postal Code"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Input
            fluid
            label="Country"
            name="country"
            placeholder="Country"
            onChange={handleInputChange}
          />
        </Form>
      </Segment>

      {/* Payment */}
      <Segment style={{ marginTop: "2em" }}>
        <Header as="h3">Payment Method</Header>
        {paymentMethods.map((method) => (
          <List.Item key={method.PaymentMethodId}>
            <Grid>
              <Grid.Column width={4}>
                <Image
                  src={method.ImageUrl}
                  size="tiny"
                  style={{ margin: "0 auto" }}
                />
              </Grid.Column>
            </Grid>
          </List.Item>
        ))}
      </Segment>

      {/* Checkout Button */}
      <Button
        primary
        size="large"
        fluid
        style={{ marginTop: "2em" }}
        onClick={() => handleOrder()}
      >
        Proceed to Payment
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cart,
  paymentMethods: state.payment.paymentMethods,
});
const mapDispatchToProps = (dispatch) => ({
  createOrder: (order) => dispatch(actions.createOrder(order)),
  fetchPaymentMethods: () => dispatch(actions.fetchPaymentMethods()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
