import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";

function PostCategoryEdit(){
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token');
    const {post_id, id} = useParams();

    useEffect(()=> {
        api.get(`api/admin/category/index`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setCategories(response.data[0])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    useEffect(()=> {
        api.get(`api/admin/category-post/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log("resp",response.data[0])
                setCategory(response.data[0].category_id)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            id: id,
            post_id : post_id,
            category_id : category,
        });

        const response = await api.post(`/api/admin/category-post/${id}/update`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/posts/${post_id}/categorias`)
        } else {
            alert(response.data.msg);
        }
    }

    return (
        <>
            <HeaderAdmin titulo={'Editar Categoria'} />
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {categories && (
                                            <div className="form-group row">
                                            <label htmlFor="partner" className="col-12 col-xs-12 col-md-12 col-form-label">Categoria*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <select  style={{padding:'0'}} value={category} onChange={e=>setCategory(e.target.value)}>
                                                    {categories.map(
                                                        (c, i)=>
                                                        (
                                                            <option key={"index"+i} value={c.id} >{c.category_name}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        )}
                                        {!categories && (
                                            <div style={{color:'black'}}>Nenhuma Categoria Encontrada</div>
                                        )}
                                        <div className="form-group">
                                            <div>
                                                <button type="submit" className="btn-enviar">
                                                    <span>Salvar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default PostCategoryEdit;