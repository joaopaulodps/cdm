import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import HeaderAdmin from '../../Headers/HeaderAdmin';

function AdminCountryImport() {

    let history = useHistory();
    const token = localStorage.getItem("token");
    const [selectedFile, setSelectedFile] = useState();
  
    function changeHandler(event) {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};
    
    function handleSubmission(event) {
        event.preventDefault();
        console.log(selectedFile);
        var axios = require('axios');

        const formData = new FormData();

        formData.append("file", selectedFile);
     
        var config = {
        method: 'post',
        url: '/api/admin/country/import',
        headers: { 
            'Content-Type': 'multipart/form-data',
            "type": "formData",
            'Authorization': 'Bearer ' + token
            },
        data : formData
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.status == 'success'){
                alert(response.data.msg);
                history.push('/admin')
            }
            else{
                alert(response.data.msg);
            }
        })
        
    }
console.log(setSelectedFile)
    return (
        <> 
            <HeaderAdmin titulo={"Importar Países"} />
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                {/* Cabeçalho */}
                                <div className="card-body">
                                    {/* Formulário de cadastro */}
                                    <form method="POST" onSubmit={handleSubmission}>
                                        {/* Campo importar dados */}
                                        <div className="form-group row">
                                            <label htmlFor="dados" className="col-12col-xs-12 col-md-12 col-form-label">Importar lista de países (São suportados apenas arquivos nos formatos .CSV, .XLS e XLSX  )</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                            <input type="file" name="file" className="form-control" onChange={changeHandler} accept=".csv, .xlsx, .xls, .ods"  required  />  
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

export default AdminCountryImport;