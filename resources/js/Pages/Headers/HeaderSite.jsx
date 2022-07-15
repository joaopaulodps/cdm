import React, { useState } from "react";

function HeaderSite({titulo}) {

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
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Países
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="/paises">Todos os Países</a>
								<a className="dropdown-item" href="/paises/america-do-sul">América do Sul</a>
								<a className="dropdown-item" href="/paises/america-norte-central-caribe">América do Norte, Central e Caribe</a>
								<a className="dropdown-item" href="/paises/asia">Ásia</a>
								<a className="dropdown-item" href="/paises/africa">África</a>
								<a className="dropdown-item" href="/paises/europa">Europa</a>
								<a className="dropdown-item" href="/paises/oceania">Oceania</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/federacoes">Federações</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link" href="/trofeus">Competições</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Principais Clubes
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="#">Clube X</a>
								<a className="dropdown-item" href="#">Clube Y</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/posts">Posts</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/sobre">Sobre Nós</a>
							</li>
						</ul>
						{/* <form class="form-inline my-2 my-lg-0">
						<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
						</form> */}
					</div>
					</div>
					</nav>
			</div>
        </>
    )

}

export default HeaderSite;