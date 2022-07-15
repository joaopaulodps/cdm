import React, { useEffect, useState } from "react";
import HeaderSite from "../Headers/HeaderSite";
import { useParams, Link } from "react-router-dom";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons' 

function ClubDetails(){

    const { club, country } = useParams();
    const [team, setTeam] = useState([]);
    const [titles, setTitles] = useState([]);
    const [count, setCountry] = useState([]);
    const [flag, setFlag] = useState([]);
    const [social, setSocial] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [fed, setFed] = useState([]);

    useEffect(()=>{

        api.get(`/api/team/${club}/indexTeam`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setTeam(response.data[0])
                setTitles(response.data[1])
                setSocial(response.data[2])
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
        })

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
                    {team && (
                        team.map(
                            (t,i)=>
                                (
                                    <div className="card" key={"index"+i}>
                                        <Title titulo={t.name}/>
                                        <h5 className="card-header">{t.name}</h5>
                                        <div className="card-body">
                                            <div style={{justifyContent:"start"}}>
                                                <img src={t.flag} style={{width:'150px', height:'150px'}}/>
                                                <p /* className="card-text" */>{t.full_name ? "Nome Completo: "+ t.full_name : ""}</p>
                                                {count && (
                                                    count.map(
                                                        (c,i)=>
                                                            (
                                                                <div key={"index"+i}>
                                                                    <p>País: <Link to={`/paises/europa/${country}/clubes`}>{c.name} <img src={flag} style={{width:'30px', height:'20px'}}/></Link></p>
                                                                </div>
                                                            )
                                                    )
                                                )}
                                                <p /* className="card-text" */>{t.city ? "Cidade: "+ t.city : ""}</p>
                                                <p /* className="card-text" */>{t.regional_federation ? "Federação Regional: "+ t.regional_federation : ""}</p>
                                                <p /* className="card-text" */>{t.foundation ? "Fundação:"+ t.foundation : ""}</p>
                                                <p /* className="card-text" */>{t.stadium ? "Estádio: "+ t.stadium : ""}</p>
                                                <p /* className="card-text" */>{t.details_history ? "Detalhes/História: "+ t.details_history : ""}</p>
                                            </div>
                                            {isLoading == false && titles && (
                                                <h5 className="card-header mt-3">Títulos</h5>
                                            )}
                                            {isLoading == false && titles && (
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
                                            {isLoading == false && social && (
                                                <h5 className="card-header mt-3">Redes Sociais</h5>
                                            )}
                                            {isLoading == false && social && (
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
                        )
                    }
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default ClubDetails;