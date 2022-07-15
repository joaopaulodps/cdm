import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminRegionalEdit(){

    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [foundation, setFoundation] = useState('');
    const [state, setState] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [country, setCountry] = useState([]);
    const [countryId, setCountryId] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')
    const { id } = useParams();

    useEffect(()=> {
        api.get('/api/admin/country/index', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setCountry(response.data[0])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    useEffect(()=> {
        api.get(`/api/admin/regional/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setName(response.data[0].name)
                setFullName(response.data[0].full_name)
                setFoundation(response.data[0].foundation)
                setState(response.data[0].state)
                setDetails(response.data[0].details_history)
                setFlag(response.data[0].flag)
                setCountryId(response.data[0].country_id)
                setSlug(response.data[0].slug)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function onSubmit(e){
        e.preventDefault();
        console.log(name, foundation, country, details)

        var data = JSON.stringify({
            id : id,
            name : name,
            full_name: fullName,
            foundation : foundation,
            state : state,
            flag : flag,
            country_id : countryId,
            details_history : details,
            slug : slug
        });

        const response = await api.post(`/api/admin/regional/${id}/update`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/federacoes-regionais")
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
            <HeaderAdmin titulo={"Editar Federação"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* country field */}
                                        {country && (
                                            <div>
                                                <select style={{padding:'0'}} value={countryId} onChange={e=>setCountryId(e.target.value)}>
                                                    <option value='' >Selecione o País </option>
                                                    {country.map(
                                                        (c, i)=>
                                                        (
                                                            <option key={"index"+i} value={c.id} >{c.name}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        {!country && (
                                            <div style={{color:'black'}}>Nenhuma Federação Regional Encontrada</div>
                                        )}
                                        {/* state field */}
                                        <div>
                                            <select style={{padding:'0'}} value={state} onChange={e=>setState(e.target.value)}>
                                                <option value=''>Selecione um Estado</option>
                                                <option value="AC">Acre</option>
                                                <option value="AL">Alagoas</option>
                                                <option value="AP">Amapá</option>
                                                <option value="AM">Amazonas</option>
                                                <option value="BA">Bahia</option>
                                                <option value="CE">Ceará</option>
                                                <option value="DF">Distrito Federal</option>
                                                <option value="ES">Espírito Santo</option>
                                                <option value="GO">Goiás</option>
                                                <option value="MA">Maranhão</option>
                                                <option value="MT">Mato Grosso</option>
                                                <option value="MS">Mato Grosso do Sul</option>
                                                <option value="MG">Minas Gerais</option>
                                                <option value="PA">Pará</option>
                                                <option value="PB">Paraíba</option>
                                                <option value="PR">Paraná</option>
                                                <option value="PE">Pernambuco</option>
                                                <option value="PI">Piauí</option>
                                                <option value="RJ">Rio de Janeiro</option>
                                                <option value="RN">Rio Grande do Norte</option>
                                                <option value="RS">Rio Grande do Sul</option>
                                                <option value="RO">Rondônia</option>
                                                <option value="RR">Roraima</option>
                                                <option value="SC">Santa Catarina</option>
                                                <option value="SP">São Paulo</option>
                                                <option value="SE">Sergipe</option>
                                                <option value="TO">Tocantins</option>
                                                <option value="EX">Estrangeiro</option>
                                            </select>
                                        </div>
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
                                            <label htmlFor="full_name" className="col-12col-xs-12 col-md-12 col-form-label">Nome Completo*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="full_name" type="text" className="form-control"  name="full_name" value={fullName ? fullName : ''} onChange={e =>setFullName(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* foundation field */}
                                        <div className="form-group row">
                                            <label htmlFor="foundation" className="col-12col-xs-12 col-md-12 col-form-label">Data de Fundação*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="foundation" type="text" className="form-control"  name="foundation" value={foundation} onChange={e =>setFoundation(e.target.value)} required />
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
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/Histŕoria*</label>
        
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} required />
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

export default AdminRegionalEdit;