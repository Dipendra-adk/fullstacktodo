
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

// const axiosInstance = axios.create({
//   baseURL: baseURL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const loginUser = async (userData) => {
//   try {
//     const response = await axiosInstance.post('token/', userData);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.detail);
//   }
// };

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export const loginUser = async (credentials) => {
    try {
      const response = await axiosInstance.post('login/', credentials);
      return response.data.token;
    } catch (error) {
      throw error.response.data.detail;
    }
  };

  
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('register/', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('profile/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.patch('profile/', profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get('tasks/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('tasks/', taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};
