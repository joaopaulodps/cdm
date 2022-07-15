import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminCategoryEdit(){

    const [category, setCategory] = useState('');
    const { id } = useParams();
    let history = useHistory();
    const token = localStorage.getItem('token')

    useEffect(()=> {
        api.get(`/api/admin/category/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setCategory(response.data[0].category_name)
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
            id : id,
            category_name : category
        });

        const response = await api.post(`/api/admin/category/${id}/update`, data, {
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
            <HeaderAdmin titulo={"Editar Categoria"}/>
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

export default AdminCategoryEdit;