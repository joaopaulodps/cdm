import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AboutDashboard() {

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        api.get('/api/admin/about', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setMessages(response.data[0])
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

    async function MessageDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/about/${id}/delete`, data, {
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
            <HeaderAdmin titulo={'Mensagens (Sobre)'}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && messages && (   
                                /* messages list */
                                <table className="table" >
                                    <tbody>
                                    {messages.map(
                                        (message, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{message.title}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir a mensagem ${message.title}?`)) MessageDelete(message.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/sobre/${message.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && !messages && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/sobre/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Mensagem</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AboutDashboard;