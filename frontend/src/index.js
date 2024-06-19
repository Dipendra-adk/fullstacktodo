// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// // importing css stylesheet to use the bootstrap class
// import 'bootstrap/dist/css/bootstrap.min.css'; //add this line only in this file

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// // Create a root for your app
// const domNode = document.getElementById('root');
// const root = createRoot(domNode);

// // Render your app inside the root
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to measure performance, use reportWebVitals
// reportWebVitals(console.log);


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
