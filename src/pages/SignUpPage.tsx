import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Sign Up</Button>
        <p>
          Already have an account?<Link style={{ marginLeft: '5px', textDecoration: "underline" }} to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
