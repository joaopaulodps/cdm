import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import FooterSite from "../Footer/FooterSite";
import api from "../../components/api";
import Title from "../../components/Title";

function ContinentDetails(){
    const { continent } = useParams();
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState('');
    const [isLoading, setLoading] = useState('');
    const [msg, setMsg] = useState('');
    let history = useHistory();

    useEffect(()=>{

        api.get(`/api/${continent}/countries/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
    },[])     
        
    function FormatContinent(continent){
        if(continent === 'asia'){
            return 'Ásia'
        }
        if(continent === 'africa'){
            return 'África'
        }
        if(continent === 'america-norte-central-caribe'){
            return 'América do Norte, Central e Caribe'
        }
        if(continent === 'america-do-sul'){
            return 'América do Sul'
        }
        if(continent === 'europa'){
            return 'Europa'
        }
        if(continent === 'oceania'){
            return 'Oceania'
        }
    }

    function onSubmit(e){
        e.preventDefault();
        if(continents){
            history.push(`/paises/${continents}`)
                api.get(`/api/${continents}/countries/index`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
                console.log("continents", continents)
        }
        else{
            history.push(`/paises`)
        }
    }

    return(
        <>
            {isLoading == false && countries && (   
                <div>
                    <HeaderSite titulo={FormatContinent(continent)} />
                    <div className="container">
                        <form onSubmit={onSubmit} style={{display:"inline-flex", margin:"20px 0 0 0"}}>
                            <select style={{padding:'0', marginRight:"10px"}} value={continents} onChange={e=>setContinents(e.target.value)}>
                                <option value='' >Todos os Países</option>
                                    <option value="africa">África</option>
                                    <option value="asia">Ásia</option>
                                    <option value="america-norte-central-caribe">América do Norte, Central e Caribe</option>
                                    <option value="america-do-sul">América do Sul</option>
                                    <option value="europa">Europa</option>
                                    <option value="oceania">Oceania</option>
                            </select>
                            <div className="form-group">
                                <div>
                                    <button type="submit" className="btn-enviar">
                                        <span>Selecionar</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="listagem">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="row">
                                        {countries.map(
                                            (country, i)=>
                                            (   
                                                <div className="col-sm-4" key={i+"index"} style={{marginTop:"10px"}}>
                                                    <div className="card" >
                                                        <Link to={`/paises/${country.continent}/${country.slug}`} className="card-body">
                                                            <img src={country.flag} style={{width:"50px", height:"40px"}} />
                                                            <h5 className="card-title">{country.name}</h5>
                                                        </Link>
                                                        <Title titulo={FormatContinent(continent)}/>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterSite />
                </div>
            )}
        </>
    )

}

export default ContinentDetails;