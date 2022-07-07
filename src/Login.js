import Header from './admin/Header'
import HeaderStore from './client/HeaderStore'
import ApiUsuario from './apis/ApiUsuario';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FloatingLabel } from 'react-bootstrap'
import Footer from './client/Footer'

function Login() {
    const navegate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    let user = JSON.parse(localStorage.getItem("user-info"))

    useEffect(() => {
        if (localStorage.getItem("user-info") && user.tipousuario === "admin") {
            navegate("/admin")
        }
        else if (localStorage.getItem("user-info") && user.tipousuario === "client") {
            navegate("/")
        }
    }, [])

    async function login() {
        let registro = { email, senha };
        const result = await ApiUsuario.login(registro);      
        if (result.id) {
            localStorage.setItem("user-info", JSON.stringify(result));
            navegate("/admin")
        }
        else {
            alert(JSON.stringify(result.error))
        }


    }

    return (

        <>
            {
                localStorage.getItem('user-info') && user.tipousuario === "admin" ?
                    <>
                        <Header />
                    </>
                    :
                    <>
                        <HeaderStore />
                    </>
            }
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
            </div><br />
            <Footer />
        </>
    )
}

export default Login
