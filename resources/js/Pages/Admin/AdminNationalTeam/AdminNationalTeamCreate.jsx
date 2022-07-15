import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";

function NationalTeamCreate(){

    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [federationName, setFederationName] = useState('');
    const [foundation, setFoundation] = useState('');
    const [stadium, setStadium] = useState('');
    const [wAffiliation, setWAffiliation] = useState('');
    const [worldFederation, setWorldFederation] = useState('');
    const [worldFederations, setFederations] = useState([]);
    const [continentalFederations, setContinents] = useState([]);
    const [wAffilDate, setWDate] = useState('');
    const [cAffiliation, setCAffiliation] = useState('');
    const [continentalFederation, setContinentalFederation] = useState('');
    const [cAffilDate, setCDate] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token');
    const {country_id} = useParams();

    useEffect(()=> {
        api.get('/api/admin/world', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setFederations(response.data[0])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    useEffect(()=> {
        api.get('/api/admin/continent', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setContinents(response.data[0])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            name : name,
            full_name : fullName,
            federation_name : federationName,
            foundation : foundation,
            stadium: stadium,
            details_history : details,
            country_id : country_id,
            world_federation_affiliation : wAffiliation,
            world_federation : worldFederation,
            world_affiliation_date : wAffilDate,
            continental_federation_affiliation : cAffiliation,
            continental_federation : continentalFederation,
            continental_affiliation_date : cAffilDate,
            flag : flag,
            slug : slug
        });

        const response = await api.post('/api/admin/national-team/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/paises/${country_id}/selecao`)
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
            <HeaderAdmin titulo={'Cadastrar Seleção'} />
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
                                        {/* federation name field */}
                                        <div className="form-group row">
                                            <label htmlFor="federation_name" className="col-12col-xs-12 col-md-12 col-form-label">Nome da Federação Nacional*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="federation_name" type="text" className="form-control"  name="federation_name" value={federationName} onChange={e =>setFederationName(e.target.value)} required />
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
                                        {/* details/history field */}
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/História</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details"  className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* world affiliation */}
                                        <div className="form-group row">
                                                <label htmlFor="wAffiliation" className="col-12 col-xs-12 col-md-12 col-form-label">É membro de alguma federação mundial?*</label>
                                                <div className="col-12 col-xs-12 col-md-12">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="wAffiliation" id="yes" value={wAffiliation} onClick={() =>setWAffiliation('y')} required/>
                                                        <label className="form-check-label" htmlFor="yes">Sim</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="wAffiliation" id="no" value={wAffiliation} onClick={() =>setWAffiliation('n')}/>
                                                        <label className="form-check-label" htmlFor="no">Não</label>
                                                    </div>   
                                                </div>
                                            </div>
                                        {/* select world federation */}
                                        {wAffiliation === 'y' &&(
                                            <div>
                                                <div className="form-group row">
                                                    <label htmlFor="partner" className="col-12 col-xs-12 col-md-12 col-form-label">Federação Continental*</label>
                                                    <div className="col-12col-xs-12 col-md-12">
                                                        <select  style={{padding:'0'}} value={worldFederation} onChange={e=>setWorldFederation(e.target.value)}>
                                                            <option key={"index"} disabled value='' >Selecione a Federação</option>
                                                            {worldFederations && (

                                                                worldFederations.map(
                                                                    (c, i)=>
                                                                    (
                                                                        <option key={"index"+i} value={c.id} >{c.name}</option>
                                                                        )
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* world affiliation date */}
                                                <div className="form-group row">
                                                    <label htmlFor="world-date" className="col-12col-xs-12 col-md-12 col-form-label">Data da Afiliação*</label>
                                                    <div className="col-12col-xs-12 col-md-12">
                                                        <input id="world-date" type="text" className="form-control"  name="world_date" value={wAffilDate} onChange={e =>setWDate(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* continental affiliation */}
                                        <div className="form-group row">
                                                <label htmlFor="cAffiliation" className="col-12 col-xs-12 col-md-12 col-form-label">É membro de alguma federação continental?*</label>
                                                <div className="col-12 col-xs-12 col-md-12">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="cAffiliation" id="yes" value={cAffiliation} onClick={() =>setCAffiliation('y')} required/>
                                                        <label className="form-check-label" htmlFor="yes">Sim</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="cAffiliation" id="no" value={cAffiliation} onClick={() =>setCAffiliation('n')}/>
                                                        <label className="form-check-label" htmlFor="no">Não</label>
                                                    </div>   
                                                </div>
                                            </div>
                                        {/* select continental federation */}
                                        {cAffiliation === 'y' &&(
                                            <div>
                                                <div className="form-group row">
                                                    <label htmlFor="cFederation" className="col-12 col-xs-12 col-md-12 col-form-label">Federação Continental*</label>
                                                    <div className="col-12col-xs-12 col-md-12">
                                                        <select  style={{padding:'0'}} value={continentalFederation} onChange={e=>setContinentalFederation(e.target.value)}>
                                                            <option key={"index"} disabled value='' >Selecione a Federação</option>
                                                            {continentalFederations && (

                                                                continentalFederations.map(
                                                                    (c, i)=>
                                                                    (
                                                                        <option key={"index"+i} value={c.id} >{c.name}</option>
                                                                        )
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* continental affiliation date */}
                                                <div className="form-group row">
                                                    <label htmlFor="continental-date" className="col-12col-xs-12 col-md-12 col-form-label">Data da Afiliação*</label>
                                                    <div className="col-12col-xs-12 col-md-12">
                                                        <input id="continental-date" type="text" className="form-control"  name="continental_date" value={cAffilDate} onChange={e =>setCDate(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

export default NationalTeamCreate;