import React from "react";
import { Link } from 'react-router-dom';
import HeaderAdmin from "../Headers/HeaderAdmin";

function AdminDashboard(){

    return (
        <div>
            <HeaderAdmin />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <table className="table" >
                                <tbody>
                                    <tr key={"usuarios"}>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/usuarios">Usuários</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/federacoes-mundiais">Federações Mundiais</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/federacoes-continentais">Federações Continentais</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/paises">Países</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/federacoes-regionais">Federações Regionais</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/competicoes-selecoes">Competições de Seleções</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/competicoes-times">Competições de Times</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <h2>
                                                <Link to="/admin/sobre">Sobre</Link>
                                            </h2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminDashboard;