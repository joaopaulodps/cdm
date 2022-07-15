import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AboutCreate() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();
        console.log(title, description)

        var data = JSON.stringify({
            title : title,
            description : description,
            slug: slug
        });

        const response = await api.post('/api/admin/about/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/sobre")
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
            <HeaderAdmin titulo={"Cadastrar Mensagem"}/>
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
                                                <input id="title" type="text" className="form-control"  name="title" value={title} onChange={Title} required />
                                            </div>
                                        </div>
                                        {/* slug field */}
                                        <div className="form-group row">
                                            <label htmlFor="slug" className="col-12col-xs-12 col-md-12 col-form-label">Slug*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="slug" type="text" className="form-control"  name="slug" value={slug} onChange={e=>setSlug(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* description field */}
                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-12col-xs-12 col-md-12 col-form-label">Texto (Descrição)*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="description" type="textarea" className="form-control"  name="description" value={description} onChange={e =>setDescription(e.target.value)} required />
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

export default AboutCreate;