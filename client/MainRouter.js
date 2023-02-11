import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signin from "./auth/Signin";
import Menu from "./core/Menu";
import Signup from "./user/Signup";

const path = {
    home: '/',
    users: '/users',
    signin: '/signin',
    signup: '/signup',
}

export default function MainRouter () {
    return (<div>
        <Menu/>
        <Switch>
            <Route exact path={path.home} component={Home}/>
            <Route path={path.users} component={Users}/>
            <Route path={path.signin} component={Signin}/>
            <Route path={path.signup} component={Signup}/>
        </Switch>
    </div>)
}