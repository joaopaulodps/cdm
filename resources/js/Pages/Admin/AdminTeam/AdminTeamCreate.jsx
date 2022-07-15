import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";

function TeamCreate(){

    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [foundation, setFoundation] = useState('');
    const [stadium, setStadium] = useState('');
    const [city, setCity] = useState('');
    const [regional, setRegional] = useState('');
    const [country, setCountry] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [trophies, setTrophies] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token');
    const {country_id} = useParams();

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            name : name,
            full_name : fullName,
            foundation : foundation,
            stadium: stadium,
            city : city,
            regional_federation: regional,
            country : country_id,
            trophies : trophies,
            details_history : details,
            flag : flag,
            slug : slug
        });

        const response = await api.post('/api/admin/team/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/paises/${country_id}/times`)
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
            <HeaderAdmin titulo={'Cadastrar Clube'} />
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
                                        {/* full name field */}
                                        <div className="form-group row">
                                            <label htmlFor="full_name" className="col-12col-xs-12 col-md-12 col-form-label">Nome Completo*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="fullname" type="text" className="form-control"  name="full_name" value={fullName} onChange={e =>setFullName(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* foundation field */}
                                        <div className="form-group row">
                                            <label htmlFor="foundation" className="col-12col-xs-12 col-md-12 col-form-label">Fundação*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="foundation" type="text" className="form-control"  name="foundation" value={foundation} onChange={e =>setFoundation(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* stadium field */}
                                        <div className="form-group row">
                                            <label htmlFor="stadium" className="col-12col-xs-12 col-md-12 col-form-label">Estádio*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="stadium" type="text" className="form-control"  name="stadium" value={stadium} onChange={e =>setStadium(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* city field */}
                                        <div className="form-group row">
                                            <label htmlFor="city" className="col-12col-xs-12 col-md-12 col-form-label">Cidade*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="city" type="text" className="form-control"  name="city" value={city} onChange={e =>setCity(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* regional_federation field */}
                                        <div className="form-group row">
                                            <label htmlFor="regional_federation" className="col-12col-xs-12 col-md-12 col-form-label">Federação Regional</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="regional_federation" type="text" className="form-control"  name="regional_federation" value={regional} onChange={e =>setRegional(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* details/history field */}
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/História</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} />
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

export default TeamCreate;