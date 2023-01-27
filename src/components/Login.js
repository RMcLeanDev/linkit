import React, {useState} from "react";

function Login(){

    const [email, setEmail] = useState('')

    function login(e){
        e.preventDefault();
        console.log("will be able to sign in one day")
    }
    return(
        <div className="loginComponent">
            <img src={require('../assets/LinkITLogoFull.png')}/>
            <div className="loginContainer">
                <form onSubmit={login}>
                    <input placeholder="Email"/>
                    <br/>
                    <input placeholder="Password"/>
                    <br/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;