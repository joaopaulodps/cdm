import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AboutEdit() {

    const {id} = useParams();
    const token = localStorage.getItem('token')
    let history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');

    useEffect(()=> {
        api.get(`api/admin/about/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setTitle(response.data[0].title)
                setSlug(response.data[0].slug)
                setDescription(response.data[0].description)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    async function onSubmit(e){
        e.preventDefault();
        console.log(title, description)

        var data = JSON.stringify({
            id : id,
            title : title,
            description : description,
            slug : slug
        });

        const response = await api.post(`/api/admin/about/${id}/update`, data, {
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
            <HeaderAdmin titulo={"Editar Mensagem"}/>
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
                                            <label htmlFor="description" className="col-12col-xs-12 col-md-12 col-form-label">Mensagem (Descrição)*</label>
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

export default AboutEdit;