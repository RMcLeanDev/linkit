import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [viewPass, setViewPass] = useState(true);

    function login(e){
        e.preventDefault();
        console.log(email)
        /* firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err)
        }) */
    }
    return(
        <div className="loginComponent">
            <img src={require('../assets/LinkITLogoFull.png')}/>
            <div className="loginContainer">
                <form onSubmit={login}>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <br/>
                    <input type={viewPass ? "password":"text"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <i className={viewPass ? "far fa-eye-slash": "far fa-eye"} id={viewPass ? "natogglePassword" : "togglePassword"} onClick={() => setViewPass(!viewPass)}></i>
                    <br/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;