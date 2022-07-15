import React, { useEffect, useState } from "react";
import HeaderSite from "../Headers/HeaderSite";
import { useParams } from "react-router-dom";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";

function FederationDetails(){

    const { federation } = useParams();
    const [fed, setFed] = useState([]);
    const [name, setName] = useState("");

    useEffect(()=>{

        api.get(`/api/federations/${federation}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setFed(response.data[0])
                setName(response.data[1])
            }
            else{
                /* setLoading(false)
                setMsg(response.data.msg) */
            }
        })
    },[])

    return(
        <>
            <HeaderSite />
            <Title titulo={name} />
            <div className="container">
                <div className="listagem">
                    {fed && (
                        fed.map(
                            (f,i)=>
                                (
                                    <div className="card" key={"index"+i}>
                                        <h2 className="card-header">{f.name}</h2>
                                        <div className="card-body">
                                            <img src={f.flag} style={{width:'150px', height:'150px'}}/>
                                            <p>{f.full_name ? "Nome Completo: "+f.full_name:""}</p>
                                            <p>{f.foundation ? "Fundação: "+f.foundation:""}</p>
                                            <p>{f.head_office ? "Sede: "+f.head_office:""}</p>
                                            <p>{f.details_history ? "Detalhes/História: "+f.details_history:""}</p>
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

export default FederationDetails;