import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => {
    return axios.get(EMPLOYEE_API_BASE_URL);
};
export const getEmployee = (id) => {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
};
export const getEmployeeByEmail = (id, email) => {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + id + "/check_email?email=" + email);
};
export const createEmployee = (employee) => {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
};
export const updateEmployee = (employee, id) => {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
}
export const deleteEmployee = (id) => {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
};