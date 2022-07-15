import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../components/api';
import HeaderSite from '../Headers/HeaderSite';

function LogIn() {

    const role = localStorage.getItem('role')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory()

    /* função para verificar os dados de usuário na tentativa de login */
    async function onSubmit(event) {
        event.preventDefault()

        /* envio dos dados para o backend */
        const response = await api.post('api/login', { email, password });
        console.log("response data", response.data);
        console.log("response data status", response.data.status);
        console.log("response error", response.data.msg)
        console.log("response error 2", response.data.error)
        console.log("verified", response.data.validate)
        if (response.data.status === 'success') {
            const role = response.data.roles[0].name;
            const token = response.data.access_token;
            const user_name = response.data.user_name;
            const validate = response.data.validate;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user_name', user_name)
            if (validate === null) {
                localStorage.clear()
                return history.push('/verificacao-email')
            } else {
                history.push('/admin')
            }
        } else {
            alert(response.data.msg);
        }
    }

    return (

        <div id='auth-background'>
            <HeaderSite />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">  
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        {/* Formulário de login */}
                                        <form onSubmit={onSubmit}>
                                            {/* Campo e-mail */}
                                            <div className="form-group row justify-content-center">
                                                <div className="col-12 col-xs-12 col-md-8">
                                                    <input id="email" type="email" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
                                                </div>
                                            </div>
                                            {/* Campo senha */}
                                            <div className="form-group row justify-content-center">
                                                <div className="col-12 col-xs-12 col-md-8">
                                                    <input id="password" type="password" className="form-control"  name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                                                </div>
                                            </div>
                                            <div className="form-group row justify-content-center">
                                                <div className="col-12 col-xs-12 col-md-8">
                                                    <button className="btn-enviar" type="submit">Entrar</button>
                                                </div>
                                                <div className="col-12 col-xs-12 col-md-8">
                                                <p><Link className="btn-link white" to='/recuperar-senha'>RECUPERAR SENHA</Link></p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default LogIn;