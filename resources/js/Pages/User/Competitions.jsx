import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";
import HeaderSite from "../Headers/HeaderSite";

function Competitions(){

    const [nations, setNations] = useState([]);
    const [clubs, setClubs] = useState([]);

    useEffect(()=>{

        api.get(`/api/competitions`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setNations(response.data[0])
                setClubs(response.data[1])
            }
            else{
                /* setLoading(false)
                setMsg(response.data.msg) */
            }
        })
    },[])

    return(
        <>
            <HeaderSite/>
            <Title titulo={"Competições"} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {nations.length>0 && ( 
                                <div className="row">
                                    <h1>Competições de Seleções</h1>
                                    {/* nations list */}
                                        {nations.map(
                                            (n, i)=>
                                            (   
                                                <div className="col-sm-4" key={"index"+i} style={{marginTop:"10px"}}>
                                                    <div className="card">
                                                        <Link to={`/trofeus/${n.slug}`} className="card-body">
                                                            <img src={n.flag} style={{width:"50px", height:"40px"}} />
                                                            <h5 className="card-title">{n.name}</h5>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            {clubs.length>0 && (   
                                <div className="row">
                                    <h1 className="mt-5">Competições de Clubes</h1>
                                    {/* clubs list */}
                                            {clubs.map(
                                                (c, i)=>
                                                (   
                                                    <div className="col-sm-4" key={"index"+i} style={{marginTop:"10px"}}>
                                                        <div className="card">
                                                            <Link to={`/trofeus/${c.slug}`} className="card-body">
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
                    </div>
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default Competitions;