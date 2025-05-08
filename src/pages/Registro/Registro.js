import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);
        console.log('Confirmar Senha:', confirmarSenha);
        console.log('Data de Nascimento:', dataNascimento);
    }
       
    return (

        <div>
            <form className='form-registro'>
                <div>
                    <h1>Cadastrar-se</h1>
                    <label className='label-nome-registro'>Nome:</label>
                    <input 
                    className='input-nome-registro'
                    type="text" 
                    required 
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e)=> setNome(e.target.value)}
                    />

                </div>
                <div>
                    <label className='label-email-registro'>Email:</label>
                    <input 
                    className='input-email-registro'
                    type="email" 
                    required 
                    placeholder='Digite seu email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label-senha-registro'>Senha:</label>
                    <input 
                    className='input-senha-registro'
                    type="password" 
                    required 
                    placeholder='Digite sua senha'
                    value={senha}
                    onChange={(e)=> setSenha(e.target.value)}/>
                </div>
                <div>
                    <label className='label-confirmar-senha-registro'>Confirmar Senha:</label>
                    <input
                    className='input-confirmar-senha-registro' 
                    type="password" 
                    required 
                    placeholder='Confirme sua senha'
                    value={confirmarSenha}
                    onChange={(e)=> setConfirmarSenha(e.target.value)}/>
                </div>
                <div>
                    <label className='label-data-registro'>Data de Nascimento:</label>
                    <input 
                    className='input-data-registro'
                    type="date"
                    required
                    placeholder='Digite sua data de nascimento'
                    value={dataNascimento}
                    onChange={(e)=> setDataNascimento(e.target.value)}/>
                </div>
                <button className='button-registro' type="submit" onClick={handleSubmit}>Registrar</button>
            </form>
        </div>
    );
};

export default Registro;