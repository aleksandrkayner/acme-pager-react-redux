import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor() {
    super();
  }
  render() {
    const { employees } = this.props;
    console.log(employees);

    return (
      <div>
        <h3>Companies Employees ({employees.count ? employees.count : ""})</h3>
        <nav>
          <Link to="/employees/0">Employees List</Link>
          <Link to="/createEmployee">Create Employee</Link>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = employees => {
  return {
    employees
  };
};

export default connect(mapStateToProps)(Nav);
