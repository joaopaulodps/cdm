import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TeamSocialMedia(){
    const {country_id, team_id} = useParams();
    const token = localStorage.getItem("token");
    const [medias, setMedias] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState('');

    useEffect(()=> {
        api.get(`api/admin/social_media/${team_id}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resposta",response.data)
                setMedias(response.data[0])
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

    async function MediaDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/social_media/${id}/delete`, data, {
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
            <HeaderAdmin titulo={'Redes Sociais'} />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {medias && (   
                                /* medias list */
                                <table className="table" >
                                    <tbody>
                                        {medias.map(
                                            (media, i)=>
                                            (   
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{media.name}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${media.name}?`)) MediaDelete(media.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/paises/${country_id}/times/${team_id}/redes-sociais/${media.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {!medias && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to={`/admin/paises/${country_id}/times/${team_id}/redes-sociais/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} />Cadastrar Redes</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default TeamSocialMedia;