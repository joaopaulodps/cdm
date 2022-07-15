import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function PostCategory(){
    const token = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const { post_id } = useParams();

    useEffect(()=> {
        api.get(`api/admin/category/${post_id}/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setCategories(response.data[0])
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

    async function CategoryDelete(id){
        var data = JSON.stringify({
            id: id
        });
        const response = await api.post(`/api/admin/category-post/${id}/delete`, data, {
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
                                                        <h2>{category.category.category_name}</h2>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div onClick={()=> {if (window.confirm(`Deseja excluir ${category.category.category_name}?`)) CategoryDelete(category.id)}} className="btn-edit"><FontAwesomeIcon icon={faTrashCan}/></div>
                                                        </div>
                                                        <div>
                                                            <Link className="btn-edit" to={`/admin/posts/${post_id}/categorias/${category.id}/editar`}><FontAwesomeIcon icon={faPen}/></Link>
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
                        <Link to={`/admin/posts/${post_id}/categorias/criar`}><div  className="btn-new"><p><FontAwesomeIcon icon={faPlus} /> Cadastrar Categoria</p></div></Link> 
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PostCategory;