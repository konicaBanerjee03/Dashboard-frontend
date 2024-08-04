import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('password123');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <p style={{ opacity: 0.5 }}>Hint: Use Email: "john@example.com" & Password: "password123" For Seeing Existing Data</p>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Sign In</Button>
        <p> Don't have an account?<Link style={{ marginLeft: '5px', textDecoration: "underline" }} to="/signup">Sign Up</Link> </p>
      </form>
    </div>
  );
};

export default SignInPage;
