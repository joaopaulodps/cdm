import React from 'react';
import {Route, Redirect } from 'react-router-dom';

function LogOut(){

    localStorage.clear();
    return(
        <Route
        render={() => <Redirect to='/entrar'/> }
        />
    )
}

export default LogOut;