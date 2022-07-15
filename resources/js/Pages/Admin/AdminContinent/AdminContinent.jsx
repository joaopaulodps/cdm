import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminContinent() {

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [continents, setContinents] = useState([]);

    useEffect(()=> {
        api.get('/api/admin/continent', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setContinents(response.data[0])
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

    async function ContinentDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/continent/${id}/delete`, data, {
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
            <HeaderAdmin titulo={"Federações Continentais"}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && continents && (   
                                /* continents list */
                                <table className="table" >
                                    <tbody>
                                    {continents.map(
                                        (continent, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{continent.name} <span>({continent.continent})</span> </h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${continent.name}?`)) ContinentDelete(continent.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/federacoes-continentais/${continent.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && !continents && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/federacoes-continentais/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Federação Continental</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminContinent;