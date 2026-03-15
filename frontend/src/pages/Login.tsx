import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('consumer');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'store') navigate('/store');
    else if (role === 'consumer') navigate('/consumer');
    else if (role === 'delivery') navigate('/delivery');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Ingresar / Registro</h2>
        <form onSubmit={handleLogin} className="form-group">
          <input type="email" placeholder="Correo electrónico" required />
          <input type="password" placeholder="Contraseña" required />
          
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="consumer">Soy Consumidor</option>
            <option value="store">Soy Restaurante / Tienda</option>
            <option value="delivery">Soy Repartidor</option>
          </select>

          {role === 'store' && (
            <input type="text" placeholder="Nombre del Restaurante" required />
          )}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
