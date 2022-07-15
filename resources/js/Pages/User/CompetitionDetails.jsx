import React, { useEffect, useState } from "react";
import HeaderSite from "../Headers/HeaderSite";
import { useParams } from "react-router-dom";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";

function CompetitionDetails(){

    const { competition } = useParams();
    const [comp, setComp] = useState([]);

    useEffect(()=>{

        api.get(`/api/competition/${competition}/details`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setComp(response.data[0])
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
        })
    },[])

    return(
        <>
            <HeaderSite />
            <div className="container">
                <div className="listagem">
                        {comp && (
                            comp.map(
                                (c,i)=>
                                    (
                                        <div className="card" key={"index"+i} style={{border:"none"}}>
                                            <h2 className="card-header">{c.name}</h2>
                                            <div className="card-body">
                                                {c.image ? <img src={c.image} style={{width:'150px', height:'150px'}}/> : ""}
                                                <p>{c.competition ? "Nome Completo: "+c.competition:""}</p>
                                                <p>{c.level ? "Nível: "+c.level:""}</p>
                                                <p>{c.details_history ? "Detalhes/História: "+c.details_history:""}</p>
                                                <Title titulo={c.name} />
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

export default CompetitionDetails;