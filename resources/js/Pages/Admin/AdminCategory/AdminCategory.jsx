import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function AdminCategory(){

    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        api.get('/api/admin/category/index', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setCategories(response.data[0])
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

    async function CategoryDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/category/${id}/delete`, data, {
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
            <HeaderAdmin titulo={'Categorias'}/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {isLoading == false && categories && (   
                                /* categories list */
                                <table className="table" >
                                    <tbody>
                                    {categories.map(
                                        (category, i)=>
                                            (
                                                <tr key={"index" + i}>
                                                    <td>
                                                        <h2>{category.category_name}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${category.category_name}?`)) CategoryDelete(category.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/categorias/${category.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {isLoading == false && !categories && (
                                <h4 className="text-center mt-5">{msg}</h4>
                            )}
                        </div>
                        <div className="col-10 col-xs-10 flex-end" id="btn-criar">        
                        <Link to="/admin/categorias/criar"><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Categoria</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminCategory;