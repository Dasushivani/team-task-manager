import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// login user
const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

const authService = {
  loginUser,
};

export default authService;