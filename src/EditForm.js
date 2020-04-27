import React, { Component } from "react";
import { connect } from "react-redux";
import { editEmployee } from "./store";

class EditForm extends Component {
  constructor(props) {
    let employee = {};
    if (props.employees.rows) {
      console.log("edit form", props.employees, props.match.params.id);
      employee = props.employees.rows.find(employee => {
        console.log(employee.id, props.match.params.id * 1);
        return employee.id === props.match.params.id * 1;
      });
      console.log("employee", employee);
    }
    super();
    this.state = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      title: employee.title
    };
  }

  render() {
    const { firstName, lastName, email, title } = this.state;
    const { change } = this.props;
    return (
      <div className="form">
        <h2>
          Edit Page For: {firstName} {lastName}
        </h2>
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
          <br />
          <button
            onClick={() => {
              change(
                firstName,
                lastName,
                email,
                title,
                this.props.match.params.id * 1,
                this.props.history.push
              );
            }}
          >
            edit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = employees => {
  return {
    employees
  };
};
const mapDispatchToProps = dispatch => {
  return {
    change: (firstName, lastName, email, title, id, push) => {
      dispatch(editEmployee(firstName, lastName, email, title, id, push));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
