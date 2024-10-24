// SuccessPayment.js
import React from "react";
import { Container, Header, Icon, Button, Message } from "semantic-ui-react";

const SuccessPayment = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "20%" }}>
      <Message positive>
        <Header as="h2">
          <Icon name="check circle" />
          Payment Successful!
        </Header>
        <p>Your payment has been processed successfully.</p>
        <Button primary href="/">
          Return to Home
        </Button>
      </Message>
    </Container>
  );
};

export default SuccessPayment;
