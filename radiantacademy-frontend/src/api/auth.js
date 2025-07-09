import axios from './axios';

export const loginUser = async (email, password) => {
  const response = await axios.post('/auth/login', {
    email,
    password,
  });
  return response.data; // ⬅️ response.data harus mengandung access_token
};

export const registerUser = async ({ username, email, password }) => {
  const response = await axios.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};
