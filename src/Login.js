import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth, provider} from './firebase';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error)=> alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img 
                src="https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg" 
                alt=""/>
                <h1>Connect with your favorite people</h1>
                <Button onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
