import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { destroy, loadEmployees } from "./store";

class EmployeesList extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log("hello hello", this.props);
    this.props.loadPage(this.props.match.params.page);
  }
  render() {
    const { employees, remove, loadPage } = this.props;
    //console.log("list", employees);
    console.log("jgkhhkhjvchjhkjhgcvhgjhkh", this.props);

    return (
      <div className="mainForTable">
        {/* <table align="center" className="headerTable">
          <tr>
            <th width="20px"></th>
            <th width="87px"></th>
            <th width="144px">Full Name</th>
            <th width="194px">Job Title</th>
            <th>Email Address</th>
          </tr>
        </table> */}
        <div className="table" align="center">
          <table className="table2" align="center" width="50%">
            <thead align="center">
              <tr>
                <th className="a"></th>
                <th className="a"></th>
                <th className="b">Full Name</th>
                <th className="b">Job Title</th>
                <th className="b">Email Address</th>
              </tr>
            </thead>

            {employees.rows
              ? employees.rows.map((employee, index) => {
                  return (
                    <tr>
                      <td className="a">{index + 1}</td>
                      <td className="a">
                        <Link to={`/editform/${employee.id}`}>
                          <button>edit</button>
                        </Link>
                        <button
                          onClick={() => {
                            remove(employee.id);
                          }}
                        >
                          delete
                        </button>
                      </td>
                      <td className="b">
                        <Link to={`/editform/${employee.id}`}>
                          {employee.name}
                        </Link>
                      </td>
                      <td className="b">{employee.title}</td>
                      <td className="b">{employee.email}</td>
                    </tr>
                  );
                })
              : ""}
          </table>
        </div>
        <div className="pageControl">
          <Link
            to={`/employees/${
              this.props.match.params.page * 1 <= 0
                ? this.props.match.params.page * 1
                : this.props.match.params.page * 1 - 1
            }`}
          >
            <button
              onClick={() => {
                if (this.props.match.params.page * 1 <= 0) {
                  return;
                } else {
                  loadPage(this.props.match.params.page * 1 - 1);
                }
              }}
            >{`<<prev`}</button>
          </Link>
          {employees.rows
            ? [...Array(Math.ceil(employees.count / 50))].map((val, ind) => {
                //console.log("indexxxxxxxx", ind);
                return (
                  <Link to={`/employees/${ind}`}>
                    <button
                      className={
                        this.props.match.params.page == ind ? "selected" : ""
                      }
                      onClick={ev => {
                        return loadPage(ind);
                      }}
                    >
                      {ind + 1}
                    </button>
                  </Link>
                );
              })
            : ""}
          <Link
            to={`/employees/${
              this.props.match.params.page * 1 < Math.ceil(employees.count / 50)
                ? this.props.match.params.page * 1 + 1
                : 0
            }`}
          >
            <button
              onClick={ev => {
                if (
                  this.props.match.params.page * 1 >=
                  Math.ceil(employees.count / 50)
                ) {
                  return loadPage(0);
                } else loadPage(this.props.match.params.page * 1 + 1);
              }}
            >{`next>>`}</button>
          </Link>
        </div>
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
    remove: id => {
      dispatch(destroy(id));
    },
    loadPage: page => {
      dispatch(loadEmployees(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
