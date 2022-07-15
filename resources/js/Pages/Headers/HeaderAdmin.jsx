import React, { useState } from "react";
import { Link } from 'react-router-dom';

function HeaderAdmin({titulo}) {

    const [show, setShow] = useState(false);

    return (
        <>
            <div id="header">
				<nav className="navbar navbar-expand-lg navbar-purple p-3 mb-2 bg-purple">
					<div className="container-fluid">
						<a className="navbar-brand text-white" href="/">CdM</a>
						<button className="navbar-toggler" id="nav-tog" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse nav-control me-6" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-link">Olá!</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/usuarios">Usuários</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/federacoes-continentais">Federações Continentais</a>
								</li>					
								<li className="nav-item">
									<a className="nav-link" href="/admin/paises">Países</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/federacoes-regionais">Federações Regionais</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/competicoes-selecoes">Competições de Seleções</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/competicoes-times">Competições de Times</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/paises/importar">Importar Dados</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/posts">Posts</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/categorias">Categorias</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/admin/sobre">Sobre</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href='/sair'>Sair</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
        </>
    )

}

export default HeaderAdmin;