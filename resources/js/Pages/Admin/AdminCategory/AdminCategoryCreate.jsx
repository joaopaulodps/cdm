import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminCategoryCreate(){

    const [category, setCategory] = useState('');
    let history = useHistory();
    const token = localStorage.getItem('token')

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            category_name : category
        });

        const response = await api.post('/api/admin/category/store', data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/categorias")
        } else {
            alert(response.data.msg);
        }
    }

    return (
        <>
            <HeaderAdmin titulo={"Cadastrar Categoria"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {/* category field */}
                                        <div className="form-group row">
                                            <label htmlFor="category" className="col-12col-xs-12 col-md-12 col-form-label">Nome da Categoria*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="category" type="text" className="form-control"  name="category" value={category} onChange={e =>setCategory(e.target.value)} required />
                                            </div>
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

export default AdminCategoryCreate;