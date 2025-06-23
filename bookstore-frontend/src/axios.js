import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bookstore-production-83e2.up.railway.app/api', // Update with your deployed backend URL
});

export default instance;
