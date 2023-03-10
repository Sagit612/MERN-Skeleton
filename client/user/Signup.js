import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { create } from "./api-user";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))


export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error: '', open: true})
            }
        })
    }

    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Sign Up
                </Typography>
                <TextField id="name" label="Name" className={classes.textField} margin="normal" value={values.name} onChange={handleChange('name')}/><br/>
                <TextField id="email" type="email" label="Email" className={classes.textField} margin="normal" value={values.email} onChange={handleChange('email')}/><br/>
                <TextField id="password" type="password" label="Password" className={classes.textField} margin="normal" value={values.password} onChange={handleChange('password')}/><br/>
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" className={classes.submit} onClick={clickSubmit}>Submit</Button>
            </CardActions>
        </Card>
        <Dialog open={values.open} disableBackdropClick={true}>
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New account successfully created
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to="/signin">
                    <Button color="primary" autoFocus="autoFocus" variant="contained">
                        Sign In
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    </div>)
}