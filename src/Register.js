
import Header from './Header'

import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Register()
{
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navegate("/add")
        }

    },[])
    const [nome,setNome]=useState("")
    const [cpf,setCpf]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [datanascimento,setDatanascimento]=useState("")
    const [sexo, setSexo]=useState("")
    const navegate=useNavigate();

    async function cadastra()
    {
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
        localStorage.setItem("user-info",JSON.stringify(result))
        

    }
    
    return(
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Cadastro de usuário</h1>
            <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)} className="form-control" placeholder="Nome" />
            <br />
            <input type="text" value={cpf} onChange={(e)=>setCpf(e.target.value)} className="form-control" placeholder="CPF" />
            <br />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="E-mail" />
            <br />
            <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} className="form-control" placeholder="Senha" />
            <br />
            <input type="date" value={datanascimento} onChange={(e)=>setDatanascimento(e.target.value)} className="form-control" placeholder="Data de nascimento" />
            <br />             
            <div onClick={(e)=>setSexo(e.target.value)} className="col-sm-6 offset-sm-3">
                <label>Sexo: </label>
                <input type="radio" value="M" name="sexo" defaultChecked /> Masculino
                <input type="radio" value="F" name="sexo" /> Feminino
            </div>
            <br />  
            <button onClick={cadastra} className="btn btn-primary">Cadastrar</button>    
        </div>
        </>
    )
}

export default Register