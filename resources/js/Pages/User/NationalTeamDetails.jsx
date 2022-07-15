import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import FooterSite from "../Footer/FooterSite";
import api from "../../components/api";
import Title from "../../components/Title";
import PageNotFound from "../NotFound";

function NationalTeamDetails(){

    const { continent, country } = useParams();
    const [flag, setFlag] = useState('');
    const [titles, setTitles] = useState([]);
    const [nation, setNation] = useState([]);
    const [social, setSocial] = useState([]);
    const [world, setWorld] = useState('');
    const [logo, setLogo] = useState('');
    const [cont, setContinent] = useState('');
    const [isLoading, setLoading] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(()=>{

        api.get(`/api/national-team/${country}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("response",response.data)
                setNation(response.data[0])
                setWorld(response.data[1].name)
                setContinent(response.data[2].name)
                setTitles(response.data[3])
                setLogo(response.data[4])
                setSocial(response.data[5])
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

    return(
        <>
            <HeaderSite />
            <div className="container">
                <div className="listagem">
                    {isLoading == false && nation && (   
                        /* country list */
                            nation.map(
                                (c, i)=>
                                (   
                                    <div className="card" key={"index"+i}>
                                        <h5 className="card-header">{c.name}</h5>
                                        <div className="card-body">
                                            <div style={{justifyContent:"start"}}>
                                            <img src={flag} style={{width:'150px', height:'150px'}}/>
                                            <p /* className="card-text" */>{c.full_name ? "Nome Completo: "+ c.full_name : ""}</p>
                                            <p /* className="card-text" */>{c.federation_name ? "Federação: "+ c.federation_name : ""}</p>
                                            <p /* className="card-text" */>{c.foundation ? "Fundação: "+ c.foundation : ""}</p>
                                            <p /* className="card-text" */>{c.stadium ? "Estádio: "+ c.stadium : ""}</p>
                                            <p /* className="card-text" */>Afiliações: {cont ? <Link className="all-link" to={`/federacoes/${cont}`}> {cont} </Link> : cont } 
                                                {c.continental_affiliation_date ? `(${c.continental_affiliation_date})` : ''} - 
                                                {world ? <Link className="all-link" to={`/federacoes/${world}`}> {world} </Link> : '---' } 
                                                {c.world_affiliation_date ? `(${c.world_affiliation_date})` : ''}
                                            </p>
                                            <Title titulo={c.name}/>
                                        </div>
                                        {isLoading == false && nation && (
                                            <h5 className="card-header mt-3">Títulos</h5>
                                        )}
                                        {isLoading == false && nation && (
                                            titles.map(
                                                    (t, i)=>
                                                    (
                                                        <div /* className="card" */ key={"index"+i}>
                                                            <div className="card-body">
                                                                <p className="card-text"><Link to={`/trofeus/${t.trophy.slug}`}>{t.trophy.competition}</Link> ({t.seasons})</p>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                        )}
                                        {isLoading == false && nation && (
                                            <h5 className="card-header mt-3">Redes Sociais</h5>
                                        )}
                                        {isLoading == false && nation && (
                                            social.map(
                                                    (s, i)=>
                                                    (
                                                        <div key={"index"+i}>
                                                            <div className="card-body">
                                                                <Link className="all-link" to={{ pathname: `https://${s.url}` }} target="_blank" ><span>{s.name}</span></Link>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                        )}
                                        </div>
                                    </div>
                                    
                                )
                            )
                    )}
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default NationalTeamDetails;