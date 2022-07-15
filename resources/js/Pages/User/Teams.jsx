import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import FooterSite from "../Footer/FooterSite";
import api from "../../components/api";
import Title from "../../components/Title";

function TeamsList(){

    const { continent, country } = useParams();
    const [teams, setTeams] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
  
        api.get(`/api/team/${country}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setTeams(response.data[0])
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
            <Title titulo="Times"/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                {teams && (
                                    teams.map(
                                        (team, i)=>
                                        (   
                                            <div className="col-sm-4" key={"index"+i} style={{marginTop:"10px"}}>
                                                <div className="card" >
                                                    <Link to={`/paises/${continent}/${country}/clubes/${team.slug}`} className="card-body">
                                                        <img src={team.flag} style={{width:"50px", height:"40px"}} />
                                                        <h5 className="card-title">{team.name}</h5>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default TeamsList;