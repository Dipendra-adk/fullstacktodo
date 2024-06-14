// src/components/TaskManagement.js
import React, { useState } from 'react';
import React from 'react';
import { useQuery } from 'react-query';

const TaskManagement = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  // src/components/TaskManagement.js



const fetchTasks = async () => {
  const response = await fetch('/api/tasks'); // Customize this endpoint
  const data = await response.json();
  return data;
};

const TaskManagement = () => {
  const { data, isLoading, error } = useQuery('tasks', fetchTasks);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {data.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};



  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Task Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter task..."
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagement;
