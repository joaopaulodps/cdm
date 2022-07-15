import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import HeaderAdmin from "../../Headers/HeaderAdmin";
import api from "../../../components/api";

function AdminTeamTitleEdit(){

    const [competitions, setCompetitions] = useState([]);
    const [competition, setCompetition] = useState('');
    const [seasons, setSeasons] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token');
    const {country_id, team_id, title_id} = useParams();

    useEffect(()=> {
        api.get('/api/admin/teams-competitions/index', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setCompetitions(response.data[0])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    useEffect(()=> {
        api.get(`api/admin/teams-titles/${title_id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setSeasons(response.data[0].seasons)
                setCompetition(response.data[0].trophy_id)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            id: title_id,
            team_id : team_id,
            trophy_id : competition,
            seasons : seasons
        });

        const response = await api.post(`api/admin/teams-titles/${title_id}/update`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push(`/admin/paises/${country_id}/times/${team_id}/titulos`)
        } else {
            alert(response.data.msg);
        }
    }

    return (
        <>
            <HeaderAdmin titulo={'Editar Título'} />
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {competitions && (
                                            <div className="form-group row">
                                                <label htmlFor="partner" className="col-12 col-xs-12 col-md-12 col-form-label">Competição*</label>
                                                <div className="col-12col-xs-12 col-md-12">
                                                    <select  style={{padding:'0'}} value={competition} onChange={e=>setCompetition(e.target.value)}>
                                                        {competitions.map(
                                                            (c, i)=>
                                                            (
                                                                <option key={"index"+i} value={c.id} >{c.name}</option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {!competitions && (
                                            <div style={{color:'black'}}>Nenhuma Federação Mundial Encontrada</div>
                                        )}
                                        {/* seasons field */}
                                        <div className="form-group row">
                                            <label htmlFor="seasons" className="col-12col-xs-12 col-md-12 col-form-label">Teamporada(s)*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="seasons" type="text" className="form-control"  name="seasons" value={seasons} onChange={e =>setSeasons(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <small className="col-12col-xs-12 col-md-12">Separe as temporadas por vírgula (Ex: 2002, 2003, 2006)</small>
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

export default AdminTeamTitleEdit;