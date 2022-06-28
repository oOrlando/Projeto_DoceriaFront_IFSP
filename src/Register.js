
import Header from './admin/Header'
import HeaderStore from './client/HeaderStore'
import ApiUsuario from './apis/ApiUsuario';
import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Register()
{
    

    useEffect(()=>{


    },[])

    let user=JSON.parse(localStorage.getItem("user-info"))
    const navegate=useNavigate();

    const [nome,setNome]=useState("")
    const [cpf,setCpf]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [datanascimento,setDatanascimento]=useState("")
    const [telefone, setTelefone]=useState("")
    let tipousuario="";

    async function cadastra(e)
    {
        e.preventDefault();
    
        if (localStorage.getItem('user-info') && user.tipousuario==="admin")
        {
            tipousuario = "admin";
        }else {
            tipousuario = "client";
        }
        let registro={nome, cpf, email, senha, datanascimento, telefone, tipousuario}

        ApiUsuario.cadastra(registro)
       
        navegate("/")       

    }
    
    
    return(
        <>
        {
            localStorage.getItem('user-info') && user.tipousuario==="admin" ?
            <>
            <Header />            
            </>
            :
            <>
             <HeaderStore /> 
            </>


        }        
        
        
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
                <input type="text" required="required" value={telefone} onChange={(e)=>setTelefone(e.target.value)} className="form-control" placeholder="Telefone" />
                <br />  
                <button type="submit" className="btn btn-primary">Cadastrar</button>   
            </form> 
        </div>
           
        </>
    )
}

export default Register