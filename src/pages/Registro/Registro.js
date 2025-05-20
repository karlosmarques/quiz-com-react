import React from 'react';
import { useState} from 'react';

import './Registro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Registro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState("1"); 


    const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();

   const tipoUsuarioBoolean = tipoUsuario === "2";

    const credentials = {
        nome: nome,
        email: email,
        senha: senha,
        datanascimento: dataNascimento,
        is_admin: tipoUsuarioBoolean
    };

    try {
        const response = await axios.post('http://localhost:8000/registro', credentials, {
            
        });

        if (response.status === 201) {
            navigate("/login");
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário. Tente novamente mais tarde.');
    }
};

       
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
                    <label className='label-data-registro'>Data de Nascimento:</label>
                    <input 
                    className='input-data-registro'
                    type="date"
                    required
                    placeholder='Digite sua data de nascimento'
                    value={dataNascimento}
                    onChange={(e)=> setDataNascimento(e.target.value)}/>
                </div>
                <div>
                <label className='label-tipo-registro'>Tipo de Usuário:</label>
                 <select
                 value={tipoUsuario}
                 onChange={(e) => setTipoUsuario(e.target.value)}
                  className="form-control">
                  <option value="1">Aluno</option>
                  <option value="2">Administrador</option>
                </select>
                </div>
                <br></br>
                <button className='button-registro' type="submit" onClick={handleSubmit}>Registrar</button>
              
            </form>
        </div>
    );
};

export default Registro;