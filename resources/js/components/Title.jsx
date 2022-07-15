import React from "react";

function Title({titulo}){

    return(
        <>
            <title>{titulo ? "CdM | "+ titulo : "Clubes do Mundo"}</title>
        </>
    )

}

export default Title;