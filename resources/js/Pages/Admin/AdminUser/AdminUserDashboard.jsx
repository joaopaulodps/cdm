import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminUser(){

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [users, setUsers] = useState([]);

    /* show users role name */
    function RoleFormat(role) {
        if(role == "2"){
            return "Adm Master"
        }
        if(role == "3"){
            return "Auxiliar"
        }
        else{
            return ""
        }
    }

    useEffect(()=> {
        api.get('/api/admin/user', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                setUsers(response.data[0])
                setLoading(false)
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

    async function UserDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/user/${id}/delete`, data, {
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
        <div>
            <HeaderAdmin titulo={'Usuários'}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && users.length > 0 && (   
                                /* users list */
                                <table className="table" >
                                    <tbody>
                                    {users.map(
                                        (user, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h4>{user.name} <span>({user.nickname})</span> </h4>
                                                        <p>{RoleFormat(user.roles[0].id)} || {user.email}</p>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir o usuário ${user.nickname}?`)) UserDelete(user.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/usuarios/${user.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && users && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/usuarios/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Usuário</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminUser;