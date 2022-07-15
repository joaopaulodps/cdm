import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminWorld() {

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [world, setWorld] = useState([]);

    useEffect(()=> {
        api.get('/api/admin/world', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setWorld(response.data[0])
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

    async function WorldDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/world/${id}/delete`, data, {
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
            <HeaderAdmin titulo={"Federações Mundiais"}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && world && (   
                                /* world list */
                                <table className="table" >
                                    <tbody>
                                    {world.map(
                                        (w, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{w.name}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${w.name}?`)) WorldDelete(w.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/federacoes-mundiais/${w.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && !world && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/federacoes-mundiais/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Federação Mundial</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminWorld;