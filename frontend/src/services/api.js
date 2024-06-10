import axios from '../axiosConfig';

export const signIn = (credentials) => axios.post('/api/auth/signin', credentials);
export const signUp = (userData) => axios.post('/api/auth/signup', userData);
export const getEmployees = () => axios.get('/api/employees');
export const addEmployee = (employeeData) => axios.post('/api/employees', employeeData);
export const getPendingEmployees = () => axios.get('/api/employees/pending');
export const approveEmployee = (employeeId) => axios.put(`/api/employees/approve/${employeeId}`);
