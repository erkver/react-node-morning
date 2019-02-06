import React, { Component } from "react";
import { connect } from "react-redux";
import { login, register } from "../../ducks/userReducer";
import axios from "axios";
import Header from "../Header/Header";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      newUser: false
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  clearInputs = () => {
    this.setState({username: "", password: ""})
  }

  registerUser = (e, username, password) => {
    e.preventDefault();
    this.props.register(username, password);
    this.clearInputs();
    this.props.history.push('/');
  }

  loginUser = (e, username, password) => {
    e.preventDefault();
    this.props.login(username, password);
    this.clearInputs();
    this.props.history.push('/');
  }

  render() {
    const { username, password, newUser } = this.state;
    return (
      <div>
        <Header />
        <button
          className="submit-btn"
          onClick={() => this.setState({ newUser: !newUser })}
        >
          Click here to {newUser ? "Login" : "Register"}
        </button>
        <h1>{newUser ? "Register" : "Login"}</h1>
        <form
          className="form-cont"
          onSubmit={e => {
            newUser
              ? this.registerUser(e, username, password)
              : this.loginUser(e, username, password)
          }}
        >
          <label>Username:</label>
          <input
            value={username}
            onChange={e => this.handleChange(e)}
            required
            name="username"
            type="text"
          />
          <label>Password:</label>
          <input
            value={password}
            onChange={e => this.handleChange(e)}
            required
            name="password"
            type="text"
          />
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({userReducer}) => ({...userReducer});

export default connect(mapStateToProps, { login, register })(Login);