import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home"

const path = {
    home: '/'
}

export default function MainRouter () {
    return (<div>
        <Switch>
            <Route exact path={path.home} component={Home}/>
        </Switch>
    </div>)
}