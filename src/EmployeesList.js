import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EmployeesList extends Component {
  constructor() {
    super();
  }
  render() {
    const { employees } = this.props;
    console.log("list", employees);
    return (
      <table>
        <tr>
          <th>Full Name</th>
          <th>Job Title</th>
          <th>Email Address</th>
        </tr>
        {employees
          ? employees.map(employee => {
              return (
                <tr>
                  <th>{employee.name}</th>
                  <th>{employee.title}</th>
                  <th>{employee.email}</th>
                </tr>
              );
            })
          : ""}
      </table>
    );
  }
}
const mapStateToProps = employees => {
  return {
    employees
  };
};
export default connect(mapStateToProps)(EmployeesList);
