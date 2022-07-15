import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminPostEdit(){

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [slug, setSlug] = useState('');

    const { id } = useParams();
    let history = useHistory();
    const token = localStorage.getItem('token')

    useEffect(()=> {
        api.get(`/api/admin/single-posts/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setTitle(response.data[0].title)
                setBody(response.data[0].body)
                setCategory(response.data[0].category_id)
                setSlug(response.data[0].slug)
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

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            id :id,
            title : title,
            body : body,
            category_id : category,
            slug : slug
        });

        const response = await api.post(`/api/admin/single-posts/${id}/update`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/posts")
        } else {
            alert(response.data.msg);
        }
    }

    function Title(e){
        setTitle(e.target.value)
        var slug = e.target.value.toLowerCase().replace(/ /g, "-", "ç", "c").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return setSlug(slug)  
    }

    return (
        <>
            <HeaderAdmin titulo={"Cadastrar Post"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* title field */}
                                        <div className="form-group row">
                                            <label htmlFor="title" className="col-12col-xs-12 col-md-12 col-form-label">Título*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="title" type="text" className="form-control"  name="title" value={title ? title : ''} onChange={Title} required />
                                            </div>
                                        </div>
                                        {/* slug field */}
                                        <div className="form-group row">
                                            <label htmlFor="slug" className="col-12col-xs-12 col-md-12 col-form-label">Slug*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="slug" type="text" className="form-control"  name="slug" value={slug} onChange={e=>setSlug(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* body field */}
                                        <div className="form-group row">
                                            <label htmlFor="body" className="col-12col-xs-12 col-md-12 col-form-label">Texto*</label>
        
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="body" className="form-control" name="body" value={body} onChange={e =>setBody(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <small className="col-12col-xs-12 col-md-12">* Campos Obrigatórios</small>
                                        </div>  
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

export default AdminPostEdit;