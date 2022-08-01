import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signUp } from "../../utilities/users-service";
//const validator = require("validator");

export default class SignUpForm extends Component {
  // class field syntax
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    // console.log(evt.target.email);
    // console.log(evt.target.password);

    // // validation
    // if (!evt.target.email || !evt.target.password) {
    //   this.setState({ error: "All fields must be filled" });
    // }
    // if (!validator.isEmail(req.body.email)) {
    //   throw Error("Email not valid");
    // }
    // if (!validator.isStrongPassword(req.body.password)) {
    //   throw Error("Password not strong enough");
    // }

    // const exists = await User.findOne({ email: req.body.email });
    // if (exists) {
    //   throw Error("Email already in use");
    // }

    try {
      // We don't want to send the confirm or error properties
      // Let's make a copy of this.state (we never want to directly modify the state obj)
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // TODO: specific error?
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  handleChange = (evt) => {
    // Unlike setters in function components,
    // this.setState MERGES the provided object, it does
    // NOT replace it
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  // Must override the render method
  // The render method take the place of a function component
  // That is, it will ultimately return its UI as JSX
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <Form
          className="form-login"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Example@email.com"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm</Form.Label>
            <Form.Control
              type="password"
              name="confirm"
              placeholder="Password"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={disable}>
            SIGN UP
          </Button>
        </Form>

        <p className="error-message">&nbsp;{this.state.error}</p>
      </>
    );
  }
}
