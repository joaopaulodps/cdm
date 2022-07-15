import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faShield, faShirt, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminNationTitle(){

    const {country_id, nation_id} = useParams();
    const token = localStorage.getItem("token");
    const [titles, setTitles] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState('');

    useEffect(()=> {
        api.get(`api/admin/nations-titles/${nation_id}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resposta",response.data)
                setTitles(response.data.title)
                setLoading(false)
                setMsg(response.data.msg)
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function TitleDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/nations-titles/${id}/delete`, data, {
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
            <HeaderAdmin titulo={'Títulos'} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {titles && (   
                                /* titles list */
                                <table className="table" >
                                    <tbody>
                                        {titles.map(
                                            (title, i)=>
                                            (   
                                                <tr key={"index" + i}>
                                                    <td>
                                                       <h4>{title.trophy.name} <span>(Nível: {title.trophy.level})</span></h4>
                                                       <p>Temporada(s): {title.seasons}</p>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${title.trophy.name}?`)) TitleDelete(title.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country_id}/selecao/${nation_id}/titulos/${title.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {titles && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to={`/admin/paises/${country_id}/selecao/${nation_id}/titulos/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} />Cadastrar Título</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminNationTitle;