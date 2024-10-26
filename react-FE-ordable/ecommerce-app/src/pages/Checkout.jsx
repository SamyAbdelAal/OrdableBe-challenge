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
import authReducer from "../store/reducers/authReducer";

const Checkout = ({
  cartItems,
  createOrder,
  fetchPaymentMethods,
  paymentMethods,
  authorized,
}) => {
  const [errors, setErrors] = useState({});

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
    let newErrors = {};
    if (!shippingInfo.firstName) newErrors.firstName = "First Name is required";
    if (!shippingInfo.lastName) newErrors.lastName = "Last Name is required";
    if (!shippingInfo.email) newErrors.email = "Email is required";
    if (!shippingInfo.address) newErrors.address = "Address is required";

    if (!shippingInfo.city) newErrors.city = "City is required";
    if (!shippingInfo.postalCode)
      newErrors.postalCode = "Postal Code is required";

    if (!shippingInfo.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let orderItems = cartItems.map((item) => ({
        ...item,
        product: item.id,
        selected_options: item.options,
        price_at_purchase: item.price,
      }));

      createOrder({
        items: orderItems,
        customer_name: shippingInfo.firstName + " " + shippingInfo.lastName,
        customer_email: shippingInfo.email,
      });
    }
  };
  console.log("shippingInfo", JSON.stringify(shippingInfo, null, 2));
  console.log("authorized", authorized);

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
                <Table.Cell>{item.price} KWD</Table.Cell>
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
              error={
                errors.firstName
                  ? { content: errors.firstName, pointing: "above" }
                  : null
              }
            />
            <Form.Input
              fluid
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              error={
                errors.lastName
                  ? { content: errors.lastName, pointing: "above" }
                  : null
              }
            />
          </Form.Group>
          <Form.Input
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={setShippingInfo.email}
            error={
              errors.email ? { content: errors.email, pointing: "above" } : null
            }
          />
          <Form.Input
            label="Address"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
            error={
              errors.address
                ? { content: errors.address, pointing: "above" }
                : null
            }
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="City"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
              error={
                errors.city ? { content: errors.city, pointing: "above" } : null
              }
            />
            <Form.Input
              fluid
              name="postalCode"
              label="Postal Code"
              placeholder="Postal Code"
              onChange={handleInputChange}
              error={
                errors.postalCode
                  ? { content: errors.postalCode, pointing: "above" }
                  : null
              }
            />
          </Form.Group>
          <Form.Input
            fluid
            label="Country"
            name="country"
            placeholder="Country"
            onChange={handleInputChange}
            error={
              errors.country
                ? { content: errors.country, pointing: "above" }
                : null
            }
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
  authorized: state.auth.authorized,
});
const mapDispatchToProps = (dispatch) => ({
  createOrder: (order) => dispatch(actions.createOrder(order)),
  fetchPaymentMethods: () => dispatch(actions.fetchPaymentMethods()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
