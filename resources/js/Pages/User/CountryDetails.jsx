import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import FooterSite from "../Footer/FooterSite";
import api from "../../components/api";
import Title from "../../components/Title";
import PageNotFound from "../NotFound";

function CountryDetails(){
    const { continent, country } = useParams();
    const [countryd, setCountry] = useState([]);
    const [flag, setFlag] = useState('');
    const [logo, setLogo] = useState('');
    const [cont, setContinent] = useState('');
    const [isLoading, setLoading] = useState('');
    const [msg, setMsg] = useState('');

        useEffect(()=>{

            api.get(`/api/${country}/index`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                if(response.data.status === 'success'){
                    console.log(response.data)
                    setCountry(response.data[0])
                    setFlag(response.data[1])
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
        
        function FormatClub(club){
            var nclub = club.toLowerCase().replace(" ", "-").replace("ç", "c").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            return nclub
        }
        console.log("logo", logo)
    return(
        <>
            <HeaderSite />
                <div className="container">
                    <div className="listagem">
                        {isLoading == false && countryd && (   
                            /* country list */
                                countryd.map(
                                    (c, i)=>
                                    (   
                                        <div className="card" key={"index"+i}>
                                            <h5 className="card-header">{c.name}</h5>
                                            <div className="card-body">
                                                <div style={{justifyContent:"start"}}>
                                                <img src={flag} style={{width:'150px', height:'150px'}}/>
                                                <p className="card-text">{c.federal_capital ? "Capital: "+ c.federal_capital : ""}</p>
                                                <p className="card-text">{c.population ? "População: "+ c.population : ""}</p>
                                                <p className="card-text">{c.continent ? "Continente: "+FormatContinent(c.continent):""}</p>
                                                <p className="card-text">{c.coin ? "Moeda: "+c.coin :""}</p>
                                                <p className="card-text">{c.official_language ? "Língua(s) Oficial(is): "+c.official_language:""}</p>
                                                </div>
                                                <a href={`/paises/${c.continent}/${c.slug}/selecao`} className="btn btn-primary" style={{margin:"10px"}}>Seleção</a>
                                                <a href={`/paises/${c.continent}/${c.slug}/clubes`} className="btn btn-primary">Times</a>
                                            </div>
                                            <Title titulo={c.name}/>
                                        </div>
                                        
                                    )
                                )
                        )}
                    </div>
                </div>
                        {/* <div class="card">
                            
                        </div>
                        <div className="row justify-content-center" style={{color:"white", width:"80%"}}>
                        
                        <img src={logo} style={{width:'140px', height:'150px'}}/>
                            <div>
                            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" id="collapse-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Detalhes do País
                        </button>
                    </h5>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                    {isLoading == false && countryd && (   
                                     country list
                                    <div className="card-body" style={{maxWidth:"1200px"}}>
                                        {countryd.map(
                                            (c, i)=>
                                            (   
                                                <div key={"index"+i} className="card-body">
                                                    <h3 className="card-title">{c.name}</h3>
                                                    <span><b>Capital</b>: {c.federal_capital ? c.federal_capital : '---'}</span><br/>
                                                    <span><b>Continente</b>: <Link className="all-link" to={`/continentes/${continent}`}>{c.continent ? FormatContinent(c.continent) : '---'}</Link></span><br/>
                                                    <span><b>Língua(s) Oficial(is)</b>: {c.official_language ? c.official_language : '---'}</span><br/>
                                                    <span><b>População Estimada</b>: {c.population ? c.population : '---'}</span>
                                                    <span><b>Moeda</b>: {c.coin ? c.coin : '---'}</span><br/>
                                                    <span><b>Detalhes/História</b>: {c.details_history ? c.details_history : '---'}</span><br/>
                                                    <Title titulo={c.name} />
                                                </div>
                                            )
                                        )}
                                </div>
                            )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                        <button className="btn btn-link collapsed" id="collapse-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Detalhes da Seleção/Federação
                        </button>
                    </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                    {isLoading == false && nation && (   
                        /* national team list
                        <div className="card-body" style={{maxWidth:"1200px"}}>
                            {nation.map(
                                (c, i)=>
                                (   
                                        <div key={"index"+i} className="card-body">
                                            <h3 className="card-title">{c.name}</h3>
                                            <span>Federação: {c.federation_name ? c.federation_name : '---'}</span><br/>
                                            <span>Fundação: {c.foundation ? c.foundation : '---'}</span><br/>
                                            <span>Afiliações: {cont ? <Link className="all-link" to={`/federacoes/${cont}`}> {cont} </Link> : '---' } 
                                                              {c.continental_affiliation_date ? `(${c.continental_affiliation_date})` : ''} - 
                                                              {world ? <Link className="all-link" to={`/federacoes/${world}`}> {world} </Link> : '---' } 
                                                              {c.world_affiliation_date ? `(${c.world_affiliation_date})` : ''}
                                            </span><br/>
                                                
                                            <span>Estádio: {c.stadium ? c.stadium : '---'}</span><br/>
                                            <span>Detalhes/História: {c.details_history ? c.details_history : '---'}</span><br/>
                                            {isLoading == false && nation && (
                                                <div> Títulos
                                                    {titles.map(
                                                            (t, i)=>
                                                            (
                                                                <div key={"index"+i}>
                                                                    <span>Título: <Link className="all-link" to={`/trofeus/${t.trophy.slug}`}>{t.trophy.name}</Link> - </span>
                                                                    <span>Temporada(s): {t.seasons}</span>
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            )}
                                            {isLoading == false && nation && (
                                                <div> Redes Sociais
                                                    {social.map(
                                                            (s, i)=>
                                                            (
                                                                <div key={"index"+i}>
                                                                    <Link className="all-link" to={{ pathname: `https://${s.url}` }} target="_blank" ><span>{s.name}</span></Link>
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                )
                            )}
                        </div>
                    )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                    <h5 className="mb-0">
                        <button className="btn btn-link collapsed" id="collapse-button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Times do País
                        </button>
                    </h5>
                    </div>
                    <div id="collapseThree" className="collapse show" aria-labelledby="headingThree">
                    {isLoading == false && teams && (   
                        /* team list
                        <div className="card-group" style={{maxWidth:"1200px"}}>
                            {teams.map(
                                (c, i)=>
                                (   
                                        <Link to={`/continentes/${continent}/${country}/${FormatClub(c.full_name)}`} key={"index"+i} className="card all-link" style={{width:"200px", minWidth:"200px", maxWidth:"200px", height:"200px", minHeight:"200px", maxHeight:"200px", margin:"10px"}}>
                                            <img src={c.flag} style={{width:"150px", height:"100px", alignSelf:"center", margin:"10px 0 30px 0"}}/>
                                            <h4 className="card-title" style={{alignSelf:"center"}}>{c.name}</h4>
                                        </Link>
                                )
                            )}
                        </div>
                    )}
                    </div>
                </div>
            </div>
                            
                        </div>
                    </div>
                </div>
                                </div> */}
            <FooterSite />
        </>
    )

}

export default CountryDetails;