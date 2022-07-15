import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";


function AdminCountryCreate() {

    const [name, setName] = useState('');
    const [federalCapital, setCapital] = useState('');
    const [population, setPopulation] = useState('');
    const [coin, setCoin] = useState('');
    const [officialLanguage, setLanguage] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [slug, setSlug] = useState('');
    const [continents, setContinents] = useState([]);
    const [continent, setContinent] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')

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
            federal_capital : federalCapital,
            population : population,
            coin : coin,
            official_language : officialLanguage,
            details_history : details,
            continent_id : continent,
            flag : flag,
            slug : slug
        });

        const response = await api.post('/api/admin/country/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/paises`)
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
            <HeaderAdmin titulo={"Cadastrar País"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {continents && (
                                            <div>
                                                <select style={{padding:'0'}} value={continent} onChange={e=>setContinent(e.target.value)}>
                                                    <option value='' >Selecione a Federação Continental </option>
                                                    {continents.map(
                                                        (c, i)=>
                                                        (
                                                            <option key={"index"+i} value={c.id} >{c.name}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        {!continents && (
                                            <div style={{color:'black'}}>Nenhuma Federação Continental Encontrada</div>
                                        )}
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome do País*</label>
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
                                        {/* federal capital field */}
                                        <div className="form-group row">
                                            <label htmlFor="federalCapital" className="col-12col-xs-12 col-md-12 col-form-label">Capital*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="federalCapital" type="text" className="form-control"  name="federalCapital" value={federalCapital} onChange={e =>setCapital(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* population field */}
                                        <div className="form-group row">
                                            <label htmlFor="population" className="col-12 col-xs-12 col-md-12 col-form-label">População</label>
                                            <div className="col-12 col-xs-12 col-md-12">
                                            <input id="population" type="text" className="form-control"  name="population" value={population} onChange={e =>setPopulation(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* coin field */}
                                        <div className="form-group row">
                                            <label htmlFor="coin" className="col-12col-xs-12 col-md-12 col-form-label">Moeda</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="coin" type="coin" className="form-control" name="coin" value={coin} onChange={e =>setCoin(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* language field */}
                                        <div className="form-group row">
                                            <label htmlFor="language" className="col-12col-xs-12 col-md-12 col-form-label">Línguas Oficiais</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="language" type="language" className="form-control" name="language" value={officialLanguage} onChange={e =>setLanguage(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* flag field */}
                                        <div className="form-group row">
                                            <label htmlFor="flag" className="col-12col-xs-12 col-md-12 col-form-label">Bandeira</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="flag" type="flag" className="form-control" name="flag" value={flag} onChange={e =>setFlag(e.target.value)} />
                                                {!flag && (
                                                    <div style={{width:'120px', height:'80px', border:'solid 1px'}}>Sem Bandeira Selecionada</div>
                                                )}
                                                {flag && (
                                                    <img src={flag} style={{width:'120px', height:'80px', border:'solid 1px'}}/>
                                                )}
                                            </div>
                                        </div>
                                        {/* details/history field */}
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/História</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} />
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

export default AdminCountryCreate;