
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';
// import Profile from './components/Profile';
// import Tasks from './components/Tasks';

// const App = () => {
//   return (

//     <BrowserRouter>
//     <AuthProvider>
//     <Navbar />
//         <Routes>
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/register" component={Register} />
//           <PrivateRoute exact path="/profile" component={Profile} />
//           <PrivateRoute exact path="/tasks" component={Tasks} />
//           <Route path="/" component={() => <div>404 Not Found</div>} />
//         </Routes>
//     </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<div> <h1 style={{ textAlign: 'center', padding: '60px' }}> Welcome to the To Do Site. </h1></div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

