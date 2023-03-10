import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}));

export default function Profile({match}) {
    const classes = useStyles();
    const [user, setUsers] = useState({});
    const [redirectToSignin, setRedirectToSignIn] = useState(false);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignIn(true);
            } else {
                setUsers(data)
            }
        })
        return function cleanup() {
            abortController.abort();
        }
    }, [match.params.userId])

    if(redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemText primary={user.name} secondary={user.email}>{
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && 
                        (
                            <ListItemSecondaryAction>
                                <Link >
                                    <IconButton aria-label="Edit" color="primary">

                                    </IconButton>
                                </Link>
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}