import { useState } from 'react';
import style from './Register.module.css';
import { redirect } from 'react-router-dom';


export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    try {
      const response = await fetch('https://back-end-rainha-alimentos-czh5glhzs-alisson-ps-projects.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        console.log('Resposta da API:', data);
        redirect('/login');
      } else {
        alert(`Erro ao registrar: ${data.message || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro ao registrar. Tente novamente mais tarde.');
    }
  };
  
  return (
    <div className={style.registerContainer}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
