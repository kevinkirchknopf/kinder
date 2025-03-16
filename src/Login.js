// Login.js
import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bejelentkezési logika
    console.log(formData);
  };

  return (
    <div className="auth-container">
      <h2>Üdv újra!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail cím</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Jelszó</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="auth-button">Bejelentkezés</button>
      </form>
      
      <p className="auth-link">
        Nincs még fiókja? <a href="/register">Regisztráljon itt</a>
      </p>
    </div>
  );
};

export default Login;