import React from "react";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";
import HeaderSite from "../Headers/HeaderSite";

function About(){

    return(
        <>
            <HeaderSite />
            <Title titulo="Sobre Nós"/>
            <div className="container">
                <div className="listagem">

                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default About;