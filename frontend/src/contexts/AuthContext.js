import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token stored');
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (state.isAuthenticated) {
          const user = await fetchUserProfile();
          dispatch({ type: 'LOGIN', payload: { user, token: localStorage.getItem('token') } });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [state.isAuthenticated]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
