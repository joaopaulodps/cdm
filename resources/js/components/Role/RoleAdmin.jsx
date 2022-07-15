import React from "react";
import { Route, Redirect } from 'react-router-dom'

const RouteAdmin = ({component: Component, ...rest}) => {
    const role = localStorage.getItem('role')

    return(
        <Route
        {...rest}
        render={() => role === 'dev' || role === 'cdm admin' || role === 'cdm auxiliar' ? <Component {...rest}/> : <Redirect to='/entrar'/>
        }
        />
    )
}

export default RouteAdmin;
