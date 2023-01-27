import React, {useState} from "react";

function Login(){

    const [email, setEmail] = useState('')
    return(
        <div className="loginComponent">
            <img src={require('../assets/LinkITLogoFull.png')}/>
            <div className="loginContainer">
                <form>
                    <input placeholder="email"/>
                    <br/>
                    <input placeholder="password"/>
                    <br/>
                    <button>sign in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;