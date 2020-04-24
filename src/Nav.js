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
      <nav>
        <h3>Companies Employees ({employees ? employees.length : ""})</h3>
        <Link to="/employees/:page">Employees List</Link>
      </nav>
    );
  }
}
const mapStateToProps = employees => {
  return {
    employees
  };
};

export default connect(mapStateToProps)(Nav);
