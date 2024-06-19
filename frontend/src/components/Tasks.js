
import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, deleteTask } from '../api';
import { useTasks, useTaskDispatch } from '../context/TaskContext';

const Tasks = () => {
  const { tasks } = useTasks();
  const dispatch = useTaskDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const tasksData = await fetchTasks();
        dispatch({ type: 'SET_TASKS', payload: tasksData });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasksData();
  }, []);

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
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
