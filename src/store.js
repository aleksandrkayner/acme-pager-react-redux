import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";
const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";
const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
const DESTROY = "DESTROY";
const CREATE = "CREATE";

const reducer = (state = {}, action) => {
  console.log("from reducer", action);
  if (action.type === LOAD_EMPLOYEES) {
    return action.employees;
  }
  if (action.type === EDIT_EMPLOYEE) {
    return {
      ...state,
      count: state.count - 1,
      rows: state.rows.map(employee => {
        return employee.id === action.employee.id ? action.employee : employee;
      })
    };
  }
  if (action.type === DESTROY) {
    return {
      ...state,
      count: state.count - 1,
      rows: state.rows.filter(employee => {
        return employee.id !== action.id ? employee : "";
      })
    };
  }
  if (action.type === CREATE) {
    return {
      ...state,
      count: state.count + 1,
      rows: [action.employee, ...state.rows]
    };
  }
  return state;
};

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true })) //, createLogger({ collapsed: true })
);
export default store;
//action
const _editEmployee = employee => {
  return {
    type: EDIT_EMPLOYEE,
    employee
  };
};
console.log("from storishe", store);

const _loadEmployees = employees => {
  console.log("from action", employees);
  return {
    type: LOAD_EMPLOYEES,
    employees
  };
};
const _destroy = id => {
  return {
    type: DESTROY,
    id
  };
};
const _create = employee => {
  return {
    type: CREATE,
    employee
  };
};
//thunks

const editEmployee = (firstName, lastName, email, title, id, push) => {
  return async dispatch => {
    let employee = await axios.put(`/api/employees/${id}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      title: title,
      id: id
    });
    push("/employees/0");
    // console.log(employee.data);
    dispatch(_editEmployee(employee.data));
  };
};

const loadEmployees = page => {
  console.log("from storishe", store);
  console.log("page from thunk", page);
  return async dispatch => {
    let employees = await axios.get(`/api/employees/${page}`);
    dispatch(_loadEmployees(employees.data));
  };
};
const destroy = id => {
  //console.log("hello 1");
  return async dispatch => {
    await axios.delete(`/api/employees/${id}`);
    //console.log("hello from thunk destry");
    dispatch(_destroy(id));
  };
};
const create = (firstName, lastName, email, title, push) => {
  return async dispatch => {
    const employee = await axios.post("/api/employees", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      title: title
    });
    let lastPage = Math.ceil(store.getState().count / 50);
    console.log(
      "from create create",
      store.getState().rows.length,
      store.getState().count,
      lastPage
    );
    push(`/employees/${lastPage - 1}`);
    return dispatch(_create(employee.data));
  };
};

export { loadEmployees, editEmployee, destroy, create };
