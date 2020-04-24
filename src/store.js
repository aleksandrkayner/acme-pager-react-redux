import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunks from "redux-thunk";
const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";

const reducer = (state = [], action) => {
  console.log("from reducer", action);
  if ((action.type = LOAD_EMPLOYEES)) {
    return action.employees;
  }
  return state;
};

const store = createStore(
  reducer,
  applyMiddleware(thunks) //, createLogger({ collapsed: true })
);

//action

const _loadEmployees = employees => {
  console.log("from action", employees);
  return {
    type: LOAD_EMPLOYEES,
    employees
  };
};

//thunks

const loadEmployees = () => {
  return async dispatch => {
    let employees = await axios.get("/api/employees");
    dispatch(_loadEmployees(employees.data));
  };
};
export default store;
export { loadEmployees };
