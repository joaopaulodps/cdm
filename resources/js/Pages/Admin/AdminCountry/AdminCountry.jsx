import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faShield, faShirt, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { isEmpty, set } from "lodash";

function AdminCountry() {

    const { continent_id } = useParams();
    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [continent, setContinent] = useState('');
    const [newCountries, setNewCountries] = useState([]);

    useEffect(()=> {
        api.get(`/api/admin/country/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setCountries(response.data[0])
                setLoading(false)
                setMsg(response.data.msg)
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    useEffect(()=> {
        api.get(`/api/admin/continent`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setContinents(response.data[0])
                setLoading(false)
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    function onSubmit(e){
        e.preventDefault();
            if(continent){
                api.get(`/api/admin/country/${continent}/index`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization' : 'Bearer '  + token
                    }
                }).then(function(response) {
                    if(response.data.status === 'success'){
                        console.log('response', response.data)
                        setCountries(response.data[0])
                    setLoading(false)
                    setMsg(response.data.msg)
                }
                else{
                    setLoading(false)
                    setMsg(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            api.get(`/api/admin/country/index`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : 'Bearer '  + token
                }
            }).then(function(response) {
                if(response.data.status === 'success'){
                    console.log(response.data)
                    setCountries(response.data[0])
                    setLoading(false)
                    setMsg(response.data.msg)
                }
                else{
                    setLoading(false)
                    setMsg(response.data.msg)
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
        
    console.log("mensagem", msg)
    async function CountryDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/country/${id}/delete`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            window.location.reload()
        } else {
            alert(response.data.msg);
        }
    }
    console.log('newcountries',newCountries)
    return (
        <>
            <HeaderAdmin titulo={"Países"}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <form onSubmit={onSubmit}>
                                {continents && (
                                    <div>
                                        <select style={{padding:'0'}} value={continent} onChange={e=>setContinent(e.target.value)}>
                                            <option value='' >Todos os Países</option>
                                            {continents.map(
                                                (continent, i)=>
                                                (
                                                    <option key={"index"+i} value={continent.id} >{continent.name}</option>
                                                    )
                                            )}
                                        </select>
                                        <div className="form-group">
                                            <div>
                                                <button type="submit" className="btn-enviar">
                                                    <span>Salvar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                            {isLoading == false && countries && (   
                                /* countries list */
                                <table className="table" >
                                    <tbody>
                                        {countries.map(
                                            (country, i)=>
                                            (   
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <img src={country.flag} style={{width:'40px', height:'40px', borderRadius:'50%'}}/>
                                                        <h2>{country.name}</h2>
                                                        <p>{country.federal_capital}</p>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${country.name}?`)) CountryDelete(country.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country.id}/times`}><FontAwesomeIcon icon={faShirt}/></Link>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country.id}/selecao`}><FontAwesomeIcon icon={faShield}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            
                            {isLoading == false && !countries && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to={`/admin/paises/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar País</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminCountry;