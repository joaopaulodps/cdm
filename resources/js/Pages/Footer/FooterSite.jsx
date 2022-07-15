import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons' 
import api from "../../components/api";
import { Link } from "react-router-dom";

function FooterSite(){

    var date = new Date;
    var year = date.getFullYear();
    const [about, setAbout] = useState('');
    const [social, setSocial] = useState([]);

    useEffect(()=>{

        api.get(`/api/about`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resp",response.data)
                setAbout(response.data[0].description)
                setSocial(response.data[1])
                
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
        })
    },[])

    return(
        <> 
            <div id='footer'> 
                <div className="container" >
                    <div style={{width:'100%'}}>
                        <div className="d-flex justify-content-around" style={{display:"inline-flex",padding:"30px 0 30px 0"}}>
                            <div>
                                <h4 style={{textAlign:"center", fontWeight:"bolder"}}>SOBRE NÓS</h4>
                                <div className="d-flex justify-content-center" style={{maxWidth:'300px'}}>{about}</div>
                            </div>
                            <div>
                                <h4 style={{textAlign:"center", fontWeight:"bolder"}}>REDES SOCIAIS</h4>
                                {social && (   
                                    /* social media list */
                                    <table className="d-flex justify-content-center" >
                                        <tbody>
                                            {social.map(
                                                (s, i)=>
                                                (   
                                                    <tr className="d-inline-flex" key={"index" + i}>
                                                        <td >
                                                            <Link className="social-link" to={{ pathname: `${s.description}` }} target="_blank"><FontAwesomeIcon style={{paddingTop:"5px", margin:"10px 10px 10px 0"}} icon={s.slug === "instagram" ? faInstagram : faTiktok} fontSize={'32px'}/></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>   
                        <div className="d-flex flex-end justify-content-center">
                            <FontAwesomeIcon style={{paddingTop:"5px"}} icon={faCopyright} fontSize={'12px'}/><span>{year} - Made with <FontAwesomeIcon style={{color:"red"}} icon={faHeart}/> by <Link to={{pathname: `https://www.clubesdomundo.com`}} target="_blank">CdM</Link></span>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )

}

export default FooterSite;