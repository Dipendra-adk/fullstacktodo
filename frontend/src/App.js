// src/App.js
import React from 'react';
import { BrowserRouter as Router, matchRoutes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/tasks" component={Tasks} />
          <Route path="/" component={() => <div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
