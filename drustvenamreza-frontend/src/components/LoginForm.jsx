import React, { useState } from 'react';
import '../CSS/LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const users = [
    { username: 'anica', password: 'anica123' },
    { username: 'andjela', password: 'andjela123' }
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username);
    } else {
      alert('Pogrešno korisničko ime ili lozinka.');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>Login</h2>
        <label htmlFor="username">Korisničko ime:</label>
        <input
          type="text"
          id="username"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Lozinka:</label>
        <input
          type="password"
          id="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Prijavi se</button>
      </div>
    </div>
  );
};

export default LoginForm;