import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminWorldCreate() {

    const [name, setName] = useState('');
    const [foundation, setFoundation] = useState('');
    const [headOffice, setHeadOffice] = useState('');
    const [details, setDetails] = useState('');
    const [fullName, setFullName] = useState('');
    const [flag, setFlag] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            name : name,
            full_name: fullName,
            foundation : foundation,
            head_office : headOffice,
            flag : flag,
            details_history : details,
            slug : slug
        });

        if(!name || !details){
            return alert("Preencha todos os campos OBRIGATÓRIOS*")
        }
        else{
            const response = await api.post('/api/admin/world/store', data, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.data.status === 'success') {
                alert(response.data.msg)
                history.push("/admin/federacoes-mundiais")
            } else {
                alert(response.data.msg);
            }    
        }
    }

    function Title(e){
        setName(e.target.value)
        var slug = e.target.value.toLowerCase().replace(/ /g, "-", "ç", "c").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return setSlug(slug)  
    }

    return (
        <>
            <HeaderAdmin titulo={"Cadastrar Federação"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="name" type="text" className="form-control"  name="name" value={name} onChange={Title} required />
                                            </div>
                                        </div>
                                        {/* slug field */}
                                        <div className="form-group row">
                                            <label htmlFor="slug" className="col-12col-xs-12 col-md-12 col-form-label">Slug*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="slug" type="text" className="form-control"  name="slug" value={slug} onChange={e=>setSlug(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* full name field */}
                                        <div className="form-group row">
                                            <label htmlFor="full_name" className="col-12col-xs-12 col-md-12 col-form-label">Nome Completo</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="full_name" type="text" className="form-control"  name="full_name" value={fullName ? fullName : ''} onChange={e =>setFullName(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* foundation field */}
                                        <div className="form-group row">
                                            <label htmlFor="foundation" className="col-12col-xs-12 col-md-12 col-form-label">Data de Fundação</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="foundation" type="text" className="form-control"  name="foundation" value={foundation} onChange={e =>setFoundation(e.target.value)}/>
                                            </div>
                                        </div>
                                        {/* head office field */}
                                        <div className="form-group row">
                                            <label htmlFor="head_office" className="col-12col-xs-12 col-md-12 col-form-label">Sede</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="head_office" type="text" className="form-control"  name="head_office" value={headOffice} onChange={e =>setHeadOffice(e.target.value)}/>
                                            </div>
                                        </div>
                                        {/* flag field */}
                                        <div className="form-group row">
                                            <label htmlFor="flag" className="col-12col-xs-12 col-md-12 col-form-label">Bandeira</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="flag" type="flag" className="form-control" name="flag" value={flag ? flag : ''} onChange={e =>setFlag(e.target.value)} />
                                                {!flag && (
                                                    <div style={{width:'120px', height:'80px', border:'solid 1px'}}>Sem Bandeira Selecionada</div>
                                                )}
                                                {flag && (
                                                    <img src={flag} style={{width:'120px', height:'80px', border:'solid 1px'}}/>
                                                )}
                                            </div>
                                        </div>
                                        {/* details field */}
                                        <div className="form-group">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/História*</label>
        
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" rows="3" name="details" value={details} onChange={e =>setDetails(e.target.value)} required />
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

export default AdminWorldCreate;