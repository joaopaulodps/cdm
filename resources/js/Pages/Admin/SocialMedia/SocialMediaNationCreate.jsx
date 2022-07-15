import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function NationSocialMediaCreate(){

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const { nation_id } = useParams();
    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            name : name,
            url : url,
            nation_id : nation_id
        });

        const response = await api.post('/api/admin/social_media/storeNation', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            /* history.push(`/admin/paises`) */
        } else {
            alert(response.data.msg);
        }
    }

    return(
        <>
            <HeaderAdmin titulo={"Cadastrar Rede Social"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome da Rede Social*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="name" type="text" className="form-control"  name="name" value={name} onChange={e=>setName(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* url field */}
                                        <div className="form-group row">
                                            <label htmlFor="url" className="col-12col-xs-12 col-md-12 col-form-label">URL*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="url" type="text" className="form-control"  name="url" value={url} onChange={e=>setUrl(e.target.value)} required />
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

export default NationSocialMediaCreate;