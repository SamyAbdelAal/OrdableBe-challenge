import React, { useState } from "react";
import {
  Form,
  Button,
  Segment,
  Header,
  Icon,
  Message,
  Grid,
} from "semantic-ui-react";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = ({ register }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      register({
        username: formData.email,
        password: formData.password,
        navigate,
      });
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      style={{ height: "100vh", backgroundColor: "#f9f9f9" }}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment padded="very">
          <Header as="h2" icon textAlign="center" color="teal">
            <Icon name="signup" />
            Sign Up
          </Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={
                errors.email
                  ? { content: errors.email, pointing: "above" }
                  : null
              }
            />
            <Form.Input
              fluid
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={
                errors.password
                  ? { content: errors.password, pointing: "above" }
                  : null
              }
            />
            <Form.Input
              fluid
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={
                errors.confirmPassword
                  ? { content: errors.confirmPassword, pointing: "above" }
                  : null
              }
            />
            <Button color="teal" fluid size="large" type="submit">
              Sign Up
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  register: (formData) => dispatch(actions.register(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
