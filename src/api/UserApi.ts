import axios from 'axios';

// WRONG - This will cause a 401 if the token is fake
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// RIGHT - For Reqres, keep it simple
export const getUsers = (page: number) =>
  axios.get(`https://reqres.in/api/users?page=${page}`);
try {
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
  console.log("API SUCCESS:", res.data);
} catch (error) {
  console.error("API ERROR:", error);
}