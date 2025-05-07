import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);

    };
    
    return (
        <div>
            <form className='form-login'>
                <div>
                    <label className='label-login-nome'>Email:</label>
                    <input 
                    className='input-login-nome'
                    type="text" 
                    required 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder='Digite seu email'/>
                </div>
                <div>
                    <label className='label-senha-login' >Senha:</label>
                    <input 
                    className='input-senha-login'
                    type="password" 
                    required 
                    value={senha}
                    onChange={(e)=> setSenha(e.target.value)}
                    placeholder='Digite sua senha'/>
                </div>
                <button className='button-login' type="submit" onClick={handleSubmit}><Link to="/home">Entrar</Link></button>
                <p className='p-login'>Não tem uma conta? <Link to="/registro">Registrar</Link></p>
            </form>
        </div>
    );
};

export default Login;