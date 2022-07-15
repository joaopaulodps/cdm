import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faShield, faShirt, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TeamTrophy(){

    const token = localStorage.getItem("token");
    const [competitions, setCompetitions] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoading, setLodaing] = useState('');

    useEffect(()=> {
        api.get(`api/admin/teams-competitions/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resposta",response.data)
                setCompetitions(response.data[0])
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

    async function CompetitionDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/teams-competitions/${id}/delete`, data, {
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
            <HeaderAdmin titulo={'Lista de Competições'} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* <form onSubmit={onSubmit}>
                                <select style={{padding:'0'}} value={continent} onChange={e=>setContinent(e.target.value)}>
                                    <option value='' >Todos os Países</option>
                                    {continents.map(
                                        (continent, i)=>
                                        (
                                            <option key={"index"+i} value={continent.id} >{continent.name}</option>
                                        )
                                    )}
                                </select>
                                <div className="form-group">
                                    <div>
                                        <button type="submit" className="btn-enviar">
                                            <span>Salvar</span>
                                        </button>
                                    </div>
                                </div>
                            </form> */}
                            {competitions && (   
                                /* competitions list */
                                <table className="table" >
                                    <tbody>
                                        {competitions.map(
                                            (competition, i)=>
                                            (   
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <img src={competition.flag} style={{width:'40px', height:'40px', borderRadius:'50%'}}/>
                                                        <h2>{competition.competition}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${competition.name}?`)) CompetitionDelete(competition.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/competicoes-times/${competition.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {!competitions && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to={`/admin/competicoes-times/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} />Cadastrar Competição</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default TeamTrophy;