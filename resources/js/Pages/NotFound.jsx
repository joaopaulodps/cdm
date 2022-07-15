import React from "react";
import Title from "../components/Title";
import HeaderSite from "./Headers/HeaderSite";

function PageNotFound(){

    return(
        <>
            <HeaderSite />
            <Title titulo={"Página não Encontrada"} />
            <h2>A página que você está procurando não existe</h2>
        </>
    )

}

export default PageNotFound;