import React from "react";
import { connect } from "react-redux";
import { create } from "./store";

class CreateEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      email: ""
    };
  }
  render() {
    const { firstName, lastName, title, email } = this.state;
    const { create, history } = this.props;
    return (
      <div align="center">
        <div className="form">
          <h2>Create Employee Form</h2>
          <form align="left" onSubmit={ev => ev.preventDefault()}>
            <label align="left">first name</label>
            <input
              value={firstName}
              placeholder="first name"
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
            />

            <label align="left">last name</label>
            <input
              value={lastName}
              placeholder="last name"
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
            />

            <label align="left">email</label>
            <input
              value={email}
              placeholder="email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />

            <label align="left">job title</label>
            <input
              value={title}
              placeholder="job title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />

            <br />
            <button
              align="center"
              className="createButton"
              onClick={() => {
                create(firstName, lastName, email, title, history.push);
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: (firstName, lastName, email, title, push) => {
      dispatch(create(firstName, lastName, email, title, push));
    }
  };
};
export default connect(null, mapDispatchToProps)(CreateEmployee);
