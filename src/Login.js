import Header from './admin/Header'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {FloatingLabel} from 'react-bootstrap'

function Login() {
    const navegate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navegate("/admin")
        }
    }, [])
    async function login() {
        console.warn(email, senha)
        let registro = { email, senha };
        let result = await fetch("http://localhost:80/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(registro)
        });
        result = await result.json();
        if (result.id){
            localStorage.setItem("user-info", JSON.stringify(result));
            navegate("/admin")
        }
        else{
            alert(JSON.stringify(result.error))
        }
        

    }

    return (

        <>
            <Header />
            <div>
                <h1>Autenticar</h1>
                <div className="col-sm-6 offset-sm-3">
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
                    <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} className='form-control' />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel controlId="floatingInput" label="Senha" className="mb-3" >
                    <input type="password" placeholder='Senha' onChange={(e) => setSenha(e.target.value)} className='form-control' />
                    </FloatingLabel>
                    <br />
                    <button className='btn btn-primary' onClick={login}>Entrar</button>
                </div>
            </div>
        </>
    )
}

export default Login