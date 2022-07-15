import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrophy, faTrashCan, faHashtag } from '@fortawesome/free-solid-svg-icons'

function Team(){

    const {country_id} = useParams();
    const token = localStorage.getItem("token");
    const [teams, setTeams] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState('');

    useEffect(()=> {
        api.get(`api/admin/team/${country_id}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resposta",response.data)
                setTeams(response.data[0])
                setMsg(response.data.msg)
                setLoading(false)
            }
            else{
                setMsg(response.data.msg)
                setLoading(false)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function TeamDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/team/${id}/delete`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            window.location.reload()
        } else {
            alert(response.data.msg);
        }
    }

    return (
        <>
            <HeaderAdmin titulo={'Clubes'} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {teams && (   
                                /* teams list */
                                <table className="table" >
                                    <tbody>
                                        {teams.map(
                                            (team, i)=>
                                            (   
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <img src={team.flag} style={{width:'40px', height:'40px', borderRadius:'50%'}}/>
                                                        <h2>{team.name}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${team.name}?`)) TeamDelete(team.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country_id}/times/${team.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country_id}/times/${team.id}/titulos`}><FontAwesomeIcon icon={faTrophy}/></Link>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country_id}/times/${team.id}/redes-sociais`}><FontAwesomeIcon icon={faHashtag}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {!teams && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to={`/admin/paises/${country_id}/times/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} />Cadastrar Clube</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default Team;