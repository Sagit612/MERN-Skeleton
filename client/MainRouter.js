import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signin from "./auth/Signin";
import Menu from "./core/Menu"

const path = {
    home: '/',
    users: '/users',
    signin: '/signin',
}

export default function MainRouter () {
    return (<div>
        <Menu/>
        <Switch>
            <Route exact path={path.home} component={Home}/>
            <Route path={path.users} component={Users}/>
            <Route path={path.signin} component={Signin}/>
        </Switch>
    </div>)
}