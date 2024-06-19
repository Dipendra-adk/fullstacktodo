

import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
};

export const useTasks = () => useContext(TaskStateContext);
export const useTaskDispatch = () => useContext(TaskDispatchContext);
