import React, { useEffect, useState } from "react";
import api from "../../components/api";
import { Link } from 'react-router-dom';
import HeaderSite from "../Headers/HeaderSite";
import FooterSite from "../Footer/FooterSite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faShield, faShirt, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Title from "../../components/Title";

function Home(){

    return (
        <> 
            <HeaderSite/>
            <Title titulo={""} />
            <div className="container">
                <div className="listagem">

                </div>
            </div>
            <FooterSite />
        </>
    )

}
export default Home;