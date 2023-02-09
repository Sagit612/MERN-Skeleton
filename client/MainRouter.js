import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";

const path = {
    home: '/',
    users: '/users'
}

export default function MainRouter () {
    return (<div>
        <Switch>
            <Route exact path={path.home} component={Home}/>
            <Route path={path.users} component={Users}/>
        </Switch>
    </div>)
}