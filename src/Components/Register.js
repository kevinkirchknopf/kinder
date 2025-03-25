import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email:'',
    username: '',
    password: '',
    confirmPassword: '',
    age: '',
    sex: 'egyéb',
    searchedSex: 'férfi',
    minAge: '',
    maxAge: '',
    bio: '',
  });

  const navigate = useNavigate();

  const steps = [
    {
      label: "Email",
      content: (
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      ),
      isValid: () => formData.email.trim() !== "",
    },
    {
      label: "Felhasználónév",
      content: (
        <div className="form-group">
          <label>Felhasználónév</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
      ),
      isValid: () => formData.username.trim() !== "",
    },
    {
      label: "Jelszó",
      content: (
        <div className="form-group">
          <label>Jelszó (minimum 6 karakter)</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          {formData.confirmPassword && formData.confirmPassword !== formData.password && (
            <p className="error-message">A jelszavak nem egyeznek!</p>
          )}
        </div>
      ),
      isValid: () => formData.password.length >= 6 && formData.password === formData.confirmPassword,
    },
    {
      label: "Életkor",
      content: (
        <div className="form-group">
          <label>Életkor (18-99 év)</label>
          <input
            type="number"
            min="18"
            max="99"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>
      ),
      isValid: () => formData.age >= 18 && formData.age <= 99,
    },
    {
      label: "Nemed",
      content: (
        <div className="form-group">
          <label>Nemed</label>
          <select
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          >
            <option value="férfi">Férfi</option>
            <option value="nő">Nő</option>
            <option value="egyéb">Egyéb</option>
          </select>
        </div>
      ),
      isValid: () => true,
    },
    {
      label: "Partner neme",
      content: (
        <div className="form-group">
          <label>Milyen nemű partnert keresel?</label>
          <select
            value={formData.searchedSex}
            onChange={(e) => setFormData({ ...formData, searchedSex: e.target.value })}
          >
            <option value="férfi">Férfi</option>
            <option value="nő">Nő</option>
            <option value="egyéb">Egyéb</option>
          </select>
        </div>
      ),
      isValid: () => !!formData.searchedSex,
    },
    {
      label: "Korhatárok",
      content: (
        <div className="form-group">
          <div className="age-range">
            <div>
              <label>Minimum kor</label>
              <input
                type="number"
                min="18"
                max="99"
                value={formData.minAge}
                onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Maximum kor</label>
              <input
                type="number"
                min="18"
                max="99"
                value={formData.maxAge}
                onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                required
              />
            </div>
          </div>
          {formData.minAge > formData.maxAge && (
            <p className="error-message">A minimum kor nem lehet nagyobb a maximumnál!</p>
          )}
        </div>
      ),
      isValid: () => 
        formData.minAge >= 18 && 
        formData.maxAge <= 99 && 
        formData.minAge <= formData.maxAge,
    },
    {
      label: "Bemutatkozás",
      content: (
        <div className="form-group">
          <label>Rövid bemutatkozás (minimum 10 karakter)</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            minLength="10"
            required
          />
        </div>
      ),
      isValid: () => formData.bio.trim().length >= 10,
    },
  ];

  // ... (handleNext, handleBack függvények változatlanok)

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (steps[step].isValid()) {
      setStep(step + 1);
    } else {
      alert("Kérjük, töltsd ki helyesen az aktuális mezőt!");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (steps.every(step => step.isValid())) {
      try {
      
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          withCredentials: true, // Cookie-k küldéséhez
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer }` // Ha használsz tokeneket
          },
          body: JSON.stringify({
            email:formData.email,
            username: formData.username,
            password: formData.password,
            sex: formData.sex,
            searchedSex: formData.searchedSex,
            age: formData.age,
            minAge: formData.minAge,
            maxAge: formData.maxAge,
            bio: formData.bio,
          }),
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Regisztrációs hiba');
        
       
        // Átirányítás vagy állapotfrissítés
        navigate("/login")
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Kérjük, töltsd ki helyesen az összes mezőt!");
    }
  };


  return (
    <div className="auth-container">
      <h2>Találja meg szerelmi párját! 💘</h2>
      <form onSubmit={handleSubmit}>
        <div className="step-indicator">
          {steps.map((s, index) => (
            <div key={index} className={`step ${index === step ? "active" : ""}`}>
              {s.label}
            </div>
          ))}
        </div>

        {steps[step].content}

        <div className="form-navigation">
          {step > 0 && <button type="button" className="auth-button" onClick={handleBack}>Vissza</button>}
          {step < steps.length - 1 ? (
            <button type="button" className="auth-button" onClick={handleNext}>Tovább</button>
          ) : (
            <button type="submit" className="auth-button">Fiók létrehozása</button>
          )}
        </div>
      </form>

      <p className="auth-link">
        Már van fiókja? <a href="/login">Jelentkezzen be itt</a>
      </p>
    </div>
  );
};

export default Register;