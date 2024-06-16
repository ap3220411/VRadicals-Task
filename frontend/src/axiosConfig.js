import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://admin-hr-dashboard-backend.onrender.com', 
  
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
