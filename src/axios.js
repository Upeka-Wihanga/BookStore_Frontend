import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://bookstore-production-83e2.up.railway.app/api', 
  baseURL: 'https://bookstore-production-83e2.up.railway.app/api',
  // baseURL: 'http://localhost:8080/api',
});

export default instance;
