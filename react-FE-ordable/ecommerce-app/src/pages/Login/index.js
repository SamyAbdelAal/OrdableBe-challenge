// Login.js
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Segment,
  Grid,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import "./styles.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/admin");
    }
  }, []);
  const handleLogin = () => {
    if (username === "" || password === "") {
      setError("Please fill out both fields.");
    } else {
      setError("");
      login({ username, password, navigate });
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      style={{ height: "100vh", backgroundColor: "#f9f9f9" }}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment padded="very" stacked>
          <Header as="h2" color="blue" textAlign="center">
            <Icon name="lock" /> Log-in to your account
          </Header>
          <Form size="large">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="blue" fluid size="large" onClick={handleLogin}>
              Login
            </Button>
          </Form>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
        </Segment>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
});
const mapDispatchToProps = (dispatch) => ({
  login: ({ username, password, navigate }) =>
    dispatch(actions.login({ username, password, navigate })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
