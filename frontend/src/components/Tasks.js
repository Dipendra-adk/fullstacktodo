import React, { useEffect, useState } from 'react';
import { Button, TextField, TextareaAutosize, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTasks, useTaskDispatch } from '../contexts/TaskContext';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; 

const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

const addTask = async (taskData) => {
  const response = await axios.post(`${BASE_URL}/tasks`, taskData);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  return response.data;
};

const Tasks = () => {
  const { tasks } = useTasks();
  const dispatch = useTaskDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const tasksData = await fetchTasks();
        dispatch({ type: 'SET_TASKS', payload: tasksData });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again later.'); 
      }
    };

    fetchTasksData();
  }, [dispatch]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, description, completed: false };
      const newTask = await addTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again later.'); 
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again later.'); 
    }
  };

  if (error) {
    return <Typography variant="body1" color="error">Error: {error}</Typography>; 
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>Tasks</Typography>
      <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
        <TextField
          type="text"
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '10px' }}
        />
        <TextareaAutosize
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} disablePadding>
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tasks;
