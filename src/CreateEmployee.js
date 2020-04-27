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
    const { create } = this.props;
    return (
      <div className="form">
        <h2>Create Employee Form</h2>
        <form onSubmit={ev => ev.preventDefault()}>
          <input
            value={firstName}
            placeholder="first name"
            onChange={e => {
              this.setState({ firstName: e.target.value });
            }}
          />
          <label>first name</label>
          <input
            value={lastName}
            placeholder="last name"
            onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
          />
          <label>last name</label>
          <input
            value={email}
            placeholder="email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <label>email</label>
          <input
            value={title}
            placeholder="job title"
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
          <label>job title</label>
          <button
            onClick={() => {
              create(firstName, lastName, email, title);
            }}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: (firstName, lastName, email, title) => {
      dispatch(create(firstName, lastName, email, title));
    }
  };
};
export default connect(null, mapDispatchToProps)(CreateEmployee);
