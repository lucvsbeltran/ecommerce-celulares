import React, { useState } from 'react';
import { loginUser, registerUser } from './api/user';
import { getProfile } from './api/profile';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setMessage('✅ Login exitoso. Token guardado.');
    } else {
      setMessage('❌ ' + (data.message || 'Error al iniciar sesión'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerUser(name, email, password);
    if (data._id) {
      setMessage('✅ Usuario registrado. Ahora inicia sesión.');
    } else {
      setMessage('❌ ' + (data.message || 'Error al registrar usuario'));
    }
  };

  const handleGetProfile = async () => {
    const data = await getProfile();
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required /><br /><br />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Registrarse</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Iniciar sesión</button>
      </form>

      <br />
      <button onClick={handleGetProfile}>Ver Perfil</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
