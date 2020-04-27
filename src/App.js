import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { loadEmployees } from "./store";
import Nav from "./Nav";
import EmployeesList from "./EmployeesList";
import EditForm from "./EditForm";
import CreateEmployee from "./CreateEmployee";

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.load(0);
  }
  render() {
    return (
      <div>
        <HashRouter>
          <Route component={Nav} />
          <Route path="/employees/:page?" component={EmployeesList} />
          <Route path="/editform/:id" component={EditForm} />
          <Route path="/createEmployee" component={CreateEmployee} />
        </HashRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: page => {
      dispatch(loadEmployees(page));
    }
  };
};
export default connect(null, mapDispatchToProps)(App);
