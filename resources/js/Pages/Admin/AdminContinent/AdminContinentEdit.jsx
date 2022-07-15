import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../components/api";
import HeaderAdmin from "../../Headers/HeaderAdmin";

function AdminContinentEdit() {

    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [foundation, setFoundation] = useState('');
    const [continent, setContinent] = useState('');
    const [details, setDetails] = useState('');
    const [flag, setFlag] = useState('');
    const [slug, setSlug] = useState('');
    const [world, setWorld] = useState([]);
    const [worldId, setWorldId] = useState('');

    let history = useHistory();
    const token = localStorage.getItem('token')
    const {id} = useParams();

    useEffect(()=> {
        api.get(`api/admin/continent/${id}/edit`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setName(response.data[0].name)
                setFullName(response.data[0].full_name)
                setFoundation(response.data[0].foundation)
                setContinent(response.data[0].continent)
                setFlag(response.data[0].flag)
                setSlug(response.data[0].slug)
                setWorldId(response.data[0].world_federation_id)
                setDetails(response.data[0].details_history)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    useEffect(()=> {
        api.get('/api/admin/world', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '  + token
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data[0])
                setWorld(response.data[0])
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

    async function onSubmit(e){
        e.preventDefault();

        var data = JSON.stringify({
            id : id,
            name : name,
            full_name: fullName,
            foundation : foundation,
            continent : continent,
            flag : flag,
            world_federation_id : worldId,
            details_history : details,
            slug : slug
        });

        const response = await api.post(`/api/admin/continent/${id}/update`, data, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 'success') {
            alert(response.data.msg)
            history.push("/admin/federacoes-continentais")
        } else {
            alert(response.data.msg);
        }
    }

    function Title(e){
        setName(e.target.value)
        var slug = e.target.value.toLowerCase().replace(/ /g, "-", "ç", "c").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return setSlug(slug)  
    }

    return (
        <>
            <HeaderAdmin titulo={"Editar Federação"}/>
            <div className="bg-internas">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">    
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        {world && (
                                            <div>
                                                <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Federação Mundial</label>
                                                <select style={{padding:'0'}} value={worldId} onChange={e=>setWorldId(e.target.value)}>
                                                    <option value='' >Selecione a Federação Mundial</option>
                                                    {world.map(
                                                        (w, i)=>
                                                        (
                                                            <option key={"index"+i} value={w.id} >{w.name}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        {!world && (
                                            <div style={{color:'black'}}>Nenhuma Federação Mundial Encontrada</div>
                                        )}
                                        {/* name field */}
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-12col-xs-12 col-md-12 col-form-label">Nome*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="name" type="text" className="form-control"  name="name" value={name} onChange={Title} required />
                                            </div>
                                        </div>
                                        {/* slug field */}
                                        <div className="form-group row">
                                            <label htmlFor="slug" className="col-12col-xs-12 col-md-12 col-form-label">Slug*</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="slug" type="text" className="form-control"  name="slug" value={slug} onChange={e=>setSlug(e.target.value)} required />
                                            </div>
                                        </div>
                                        {/* full name field */}
                                        <div className="form-group row">
                                            <label htmlFor="full_name" className="col-12col-xs-12 col-md-12 col-form-label">Nome Completo</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="full_name" type="text" className="form-control"  name="full_name" value={fullName ? fullName : ''} onChange={e =>setFullName(e.target.value)}/>
                                            </div>
                                        </div>
                                        {/* foundation field */}
                                        <div className="form-group row">
                                            <label htmlFor="foundation" className="col-12col-xs-12 col-md-12 col-form-label">Data de Fundação</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="foundation" type="text" className="form-control"  name="foundation" value={foundation} onChange={e =>setFoundation(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* continent field */}
                                        <div className="form-group row">
                                            <label htmlFor="continent" className="col-12 col-xs-12 col-md-12 col-form-label">Continente*</label>
                                            <div className="col-12 col-xs-12 col-md-12">
                                                <select className="form-control" id="continent" name="continent" value={continent} onChange={e => setContinent(e.target.value)} required>
                                                    <option value='' disabled defaultValue>Selecione um Continente</option>
                                                    <option value="América do Sul">América do Sul</option>
                                                    <option value="África">África</option>
                                                    <option value="América do Norte, Central e Caribe">América do Norte, Central e Caribe</option>
                                                    <option value="Europa">Europa</option>
                                                    <option value="Ásia">Ásia</option>
                                                    <option value="Oceania">Oceania</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* flag field */}
                                        <div className="form-group row">
                                            <label htmlFor="flag" className="col-12col-xs-12 col-md-12 col-form-label">Bandeira</label>
                                            <div className="col-12col-xs-12 col-md-12">
                                                <input id="flag" type="flag" className="form-control" name="flag" value={flag ? flag : ''} onChange={e =>setFlag(e.target.value)} />
                                                {!flag && (
                                                    <div style={{width:'120px', height:'80px', border:'solid 1px'}}>Sem Bandeira Selecionada</div>
                                                )}
                                                {flag && (
                                                    <img src={flag} style={{width:'120px', height:'80px', border:'solid 1px'}}/>
                                                )}
                                            </div>
                                        </div>
                                        {/* details field */}
                                        <div className="form-group row">
                                            <label htmlFor="details" className="col-12col-xs-12 col-md-12 col-form-label">Detalhes/Histŕoria*</label>
        
                                            <div className="col-12col-xs-12 col-md-12">
                                                <textarea id="details" className="form-control" name="details" value={details} onChange={e =>setDetails(e.target.value)} required />
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

export default AdminContinentEdit;