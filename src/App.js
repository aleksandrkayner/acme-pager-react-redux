import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { loadEmployees } from "./store";
import Nav from "./Nav";
import EmployeesList from "./EmployeesList";

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.load();
  }
  render() {
    return (
      <div>
        <HashRouter>
          <Route component={Nav} />
          <Route path="/employees/:page?" component={EmployeesList} />
        </HashRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(loadEmployees());
    }
  };
};
export default connect(null, mapDispatchToProps)(App);
