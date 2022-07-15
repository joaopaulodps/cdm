import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";
import HeaderSite from "../Headers/HeaderSite";

function Federations(){

    const [world, setWorld] = useState([]);
    const [continental, setContinental] = useState([]);
    const [regional, setRegional] = useState([]);

    useEffect(()=>{

        api.get(`/api/federations`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setWorld(response.data[0])
                setContinental(response.data[1])
                setRegional(response.data[2])
            }
            else{
                /* setLoading(false)
                setMsg(response.data.msg) */
            }
        })
    },[])

    function FormatFederation(federation){
        var nfederation = federation.toLowerCase().replace(" ", "-");
        return nfederation
    }

    return(
        <>
            <HeaderSite/>
            <Title titulo={"Federações"} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {world.length>0 && ( 
                                <div className="row">
                                    <h1>Federações Mundiais</h1>
                                    {/* world list */}
                                        {world.map(
                                            (w, i)=>
                                            (   
                                                <div className="col-sm-4" key={"index"+i} style={{marginTop:"10px"}}>
                                                    <div className="card">
                                                        <Link to={`/federacoes/${FormatFederation(w.name)}`} className="card-body">
                                                            <img src={w.flag} style={{width:"50px", height:"40px"}} />
                                                            <h5 className="card-title">{w.name}</h5>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            {continental.length>0 && (   
                                <div className="row">
                                    <h1 className="mt-5">Federações Continentais</h1>
                                    {/* continental list */}
                                        {continental.map(
                                            (c, i)=>
                                            (   
                                                <div className="col-sm-4" key={"index"+i} style={{marginTop:"10px"}}>
                                                    <div className="card">
                                                        <Link to={`/federacoes/${FormatFederation(c.name)}`} className="card-body">
                                                            <img src={c.flag} style={{width:"50px", height:"40px"}} />
                                                            <h5 className="card-title">{c.name}</h5>
                                                        </Link>
                                                    </div>
                                                </div>   
                                            )
                                        )}
                                    </div>
                            )}
                        </div>
                        <div>
                            {regional.length>0 && (  
                            <div> 
                                <h1>Federações Regionais</h1>
                                    {/* regional list */}
                                    <div className="card-group" style={{maxWidth:"1200px"}}>
                                            {regional.map(
                                                (r, i)=>
                                                (   
                                                    <Link className="all-link" to={`/federacoes/${FormatFederation(r.name)}`} key={"index"+i} className="card all-link" style={{width:"200px", minWidth:"200px", maxWidth:"200px"}}>
                                                        <div className="card-body">
                                                        <h4 className="card-title">{r.name}</h4>
                                                        </div>
                                                    </Link>
                                                )
                                            )}
                                    </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default Federations;