import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";

function TeamTrophyCreate(){

    const [name, setName] = useState('');
    const [competition, setCompetition] = useState('');
    const [level, setLevel] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            name : name,
            competition : competition,
            level : level,
            details_history : details,
            flag : flag,
            slug : slug
        });

        const response = await api.post('/api/admin/teams-competitions/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/competicoes-times`)
        } else {
            alert(response.data.msg);
        }
    }

    function Title(e){
        setName(e.target.value)
        var slug = e.target.value.toLowerCase().replace(/ /g, "-", "ç", "c").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return setSlug(slug)  
    }

    return (
        <>
            <HeaderAdmin titulo={'Cadastrar Competição'} />
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome Simplificado*</label>
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
                                        {/* competition field */}
                                        <div className="form-group row">
                                            <label htmlFor="competition" className="col-12col-xs-12 col-md-12 col-form-label">Nome Completo*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="competition" type="text" className="form-control"  name="competition" value={competition} onChange={e =>setCompetition(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* details/history field */}
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/História</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* level field */}
                                        <div className="form-group row">
                                            <label htmlFor="level" className="col-12 col-xs-12 col-md-12 col-form-label">Nível</label>
                                            <div className="col-12 col-xs-12 col-md-12">
                                            <input id="level" type="text" className="form-control"  name="level" value={level} onChange={e =>setLevel(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* flag field */}
                                        <div className="form-group row">
                                            <label htmlFor="flag" className="col-12col-xs-12 col-md-12 col-form-label">Logo</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="flag" type="flag" className="form-control" name="flag" value={flag} onChange={e =>setFlag(e.target.value)} />
                                                {!flag && (
                                                    <div style={{width:'120px', height:'80px', border:'solid 1px'}}>Sem Logo</div>
                                                )}
                                                {flag && (
                                                    <img src={flag} style={{width:'120px', height:'80px', border:'solid 1px'}}/>
                                                )}
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

export default TeamTrophyCreate;