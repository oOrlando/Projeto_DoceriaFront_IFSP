
import Header from './admin/Header'

import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Register()
{
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navegate("/login")
        }

    },[])
    const [nome,setNome]=useState("")
    const [cpf,setCpf]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [datanascimento,setDatanascimento]=useState("")
    const [sexo, setSexo]=useState('M')
    const navegate=useNavigate();

    async function cadastra(e)
    {
        e.preventDefault();
        let registro={nome, cpf, email, senha, datanascimento, sexo}

        console.warn(registro)

        let result = await fetch("http://localhost:80/api/register",{
            method: 'POST',
            body:JSON.stringify(registro),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })

        result = await result.json()
        navegate("/")
        

    }
    
    return(
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Cadastrar usuário</h1>
            <form onSubmit={cadastra}>
                <input type="text" required="required" value={nome} onChange={(e)=>setNome(e.target.value)} className="form-control" placeholder="Nome" />
                <br />
                <input type="text" required="required" value={cpf} onChange={(e)=>setCpf(e.target.value)} className="form-control" placeholder="CPF" />
                <br />
                <input type="email" required="required" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="E-mail" />
                <br />
                <input type="password" required="required" value={senha} onChange={(e)=>setSenha(e.target.value)} className="form-control" placeholder="Senha" />
                <br />
                <input type="date" required="required" value={datanascimento} onChange={(e)=>setDatanascimento(e.target.value)} className="form-control" placeholder="Data de nascimento" />
                <br />             
                <div onClick={(e)=>setSexo(e.target.value)} className="col-sm-6 offset-sm-3">
                    <label>Sexo: </label>
                    <input type="radio" value="M" name="sexo" defaultChecked /> Masculino
                    <input type="radio" value="F" name="sexo" /> Feminino
                </div>
                <br />  
                <button type="submit" className="btn btn-primary">Cadastrar</button>   
            </form> 
        </div>
        </>
    )
}

export default Register