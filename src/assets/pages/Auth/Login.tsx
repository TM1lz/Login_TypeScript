import { useState } from 'react';
import style from './Login.module.css'
import { redirect } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch('https://back-end-rainha-alimentos-czh5glhzs-alisson-ps-projects.vercel.app/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({    
              email: formData.email,
              password: formData.password,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            const { token } = data;
            localStorage.setItem('token', token);
            redirect('/login');
          } else {
            alert(`Erro ao registrar: ${data.message || 'Tente novamente.'}`);
          }
        } catch (err) {
          console.error('Erro na requisição:', error , err);
          setError('Erro ao fazer o login. Tente novamente mais tarde.');
        }
      };
  return (
    <div className={style.LoginContainer}>
      <h2>Login</h2>
        <form onSubmit={handleSubmit} className={style.form}>
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
        <button>Enviar</button>
        </form>
        <p>{error}</p>
        </div>
  )
}
