import axios from "axios";

const API_URL = "http://localhost:4000/api"; // backend base

// Registro
export const registerUser = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return res.data;
};

// Login
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

// Perfil (requiere token)
export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
