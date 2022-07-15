import React from "react";
import { Route, Redirect ,withRouter } from 'react-router-dom';



const Authenticated = ({component: Component, ...rest}) => {
    const role = localStorage.getItem('role')
    let redirect = null;

    console.log('ROLE Authenticated', role)


    if(role === 'cdm admin' || role === 'cdm auxiliar' || role === 'dev'){
        redirect = 'admin'

    }

    return (
        <Route
        {...rest}
        render={() => redirect ?  <Redirect to={redirect}/> : <Component {...rest}/>
        }
        />
    )


}

export default withRouter(Authenticated);
