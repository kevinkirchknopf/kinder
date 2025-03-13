// Register.js
import React, { useState } from 'react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'egyéb',
    profilePicture: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Regisztrációs logika
    console.log(formData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  return (
    <div className="auth-container">
      <h2>Találja meg szerelmi párját! 💘</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profilkép</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Teljes név</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

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

        <div className="form-group">
          <label>Életkor</label>
          <input
            type="number"
            min="18"
            max="99"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Nem</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="férfi">Férfi</option>
            <option value="nő">Nő</option>
            <option value="egyéb">Egyéb</option>
          </select>
        </div>

        <button type="submit" className="auth-button">Fiók létrehozása</button>
      </form>

      <p className="auth-link">
        Már van fiókja? <a href="/login">Jelentkezzen be itt</a>
      </p>
    </div>
  );
};

export default Register;