// FailurePayment.js
import React from "react";
import { Container, Header, Icon, Button, Message } from "semantic-ui-react";

const FailurePayment = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "20%" }}>
      <Message negative>
        <Header as="h2">
          <Icon name="times circle" />
          Payment Failed!
        </Header>
        <p>Unfortunately, your payment could not be processed.</p>
        <p>Please try again or contact support.</p>
        <Button secondary href="/">
          Retry Payment
        </Button>
      </Message>
    </Container>
  );
};

export default FailurePayment;
