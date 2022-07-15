import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function UserCreate() {

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();
        console.log(name, nickname, email, password, role)

        var data = JSON.stringify({
            name : name,
            nickname : nickname,
            email : email,
            password : password,
            role : role
        });

        const response = await api.post('/api/admin/user/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/usuarios")
        } else {
            alert(response.data.msg);
        }
    }

    return (
        <>
            <HeaderAdmin titulo={"Cadastrar Usuário"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* user role field*/}
                                        <div className="form-group row">
                                            <label htmlFor="role" className="col-12col-xs-12 col-md-12 col-form-label">Tipo de Usuário*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="role" id="tipo1" value={role} onClick={() =>setRole('2')} required/>
                                                        <label className="form-check-label" htmlFor="tipo1">Administrador Master</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="role" id="tipo2" value={role} onClick={() =>setRole('3')} required/>
                                                        <label className="form-check-label" htmlFor="tipo0">Auxiliar</label>
                                                    </div>   
                                            </div>
                                        </div>
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="name" type="text" className="form-control"  name="name" value={name} onChange={e =>setName(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* nickname field */}
                                        <div className="form-group row">
                                            <label htmlFor="nickname" className="col-12col-xs-12 col-md-12 col-form-label">Nome de Usuário*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="nickname" type="text" className="form-control"  name="nickname" value={nickname} onChange={e =>setNickname(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* e-mail field */}
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-12col-xs-12 col-md-12 col-form-label">E-mail*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="email" type="email" className="form-control"  name="email" value={email} onChange={e =>setEmail(e.target.value)} required/>
                                            </div>
                                        </div>
                                        {/* password field */}
                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-12col-xs-12 col-md-12 col-form-label">Senha*</label>
        
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="password" type="password" className="form-control" name="password" value={password} onChange={e =>setPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <small className="col-12col-xs-12 col-md-12">* Campos Obrigatórios</small>
                                        </div>  
                                        <div className="form-group">
                                            <div>
                                                <button type="submit" className="btn-enviar">
                                                    <span>Salvar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default UserCreate;