import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminRegional(){

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [regionals, setRegionals] = useState([]);

    useEffect(()=> {
        api.get('/api/admin/regional/index', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setRegionals(response.data[0])
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

    async function RegionalDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/regional/${id}/delete`, data, {
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
            <HeaderAdmin titulo={"Federações Regionais"}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && regionals && (   
                                /* regionals list */
                                <table className="table" >
                                    <tbody>
                                    {regionals.map(
                                        (regional, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{regional.name} <span>({regional.state})</span> </h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${regional.name}?`)) RegionalDelete(regional.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/federacoes-regionais/${regional.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && !regionals && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/federacoes-regionais/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Federação regional</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminRegional;