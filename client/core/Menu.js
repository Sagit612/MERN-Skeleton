import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link  from "react-router-dom/Link";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import auth from "../auth/auth-helper";
import Button from "@material-ui/core/Button";

const isActive = (history, path) => {
    if (history.location.pathname == path) 
        return {color: '#ff4081'}
    else 
        return {color: '#ffffff'}
}

const Menu = withRouter(({history}) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                MERN Skeleton
            </Typography>
            <Link to='/'>
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon/>
                </IconButton>
            </Link>
            <Link>
            {
                !auth.isAuthenticated() && (<span>
                    <Link to="/signup">
                        <Button style={isActive(history, "/signup")}>Sign Up</Button>
                    </Link>
                    <Link to="/signin">
                        <Button style={isActive(history, "/signin")}>Sign In</Button>
                    </Link>
                </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                    </Link>
                    <Button color="inherit" onClick={() => {
                        auth.clearJWT(() => history.push('/'))
                    }}>
                        Sign Out
                    </Button>
                </span>)
            }
            </Link>
        </Toolbar>
    </AppBar>
))

export default Menu