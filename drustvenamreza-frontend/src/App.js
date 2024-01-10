
import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Feed from './components/Feed';
import Profile from './components/Profile';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    return <Navigate to="/" />;
  };

  const [krterijumPretrage,setKriterijumPretrage]=useState("");

  function pretrazi(kriterijum){
    setKriterijumPretrage(kriterijum);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {loggedInUser && <NavBar  pretrazi={pretrazi} loggedInUser={loggedInUser} handleLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/feed" /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route 
            path="/feed" 
            element={<Feed  kriterijum={krterijumPretrage} loggedInUser={loggedInUser} />} 
          />
          <Route
            path="/profile"
            element={loggedInUser ? <Profile loggedInUser={loggedInUser} /> : <Navigate to="/" />}
          />


          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
