// SuccessPayment.js
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Icon, Button, Message } from "semantic-ui-react";

const SuccessPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id");
  const paymentId = queryParams.get("payment_id");
  console.log("sdsds", useParams());

  return (
    <Container textAlign="center" style={{ marginTop: "10%", height: "50vh" }}>
      <Message positive>
        <Header as="h2">
          <Icon name="check circle" />
          Payment Successful!
        </Header>
        <p>Your payment has been processed successfully.</p>
        <p>Payment ID: {paymentId}</p>
        <p>Order ID: {orderId}</p>
        <Button primary href="/">
          Return to Home
        </Button>
      </Message>
    </Container>
  );
};

export default SuccessPayment;
