
import Header from './admin/Header'
import HeaderStore from './client/HeaderStore'
import ApiUsuario from './apis/ApiUsuario';
import React ,{useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function Register()
{
    

    
    let user=JSON.parse(localStorage.getItem("user-info"))
    const { ca } = useParams();
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

        let local = await ApiUsuario.cadastra(registro)

        if (tipousuario==="admin"){
            navegate("/admin") 

        }
        localStorage.setItem("user-info", JSON.stringify(local));
        if (ca == null){
            navegate("/address") 

        }else{
            navegate("/address/"+ca) 

        }
              

    }

    useEffect(()=>{


    },[])

    
    
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
            <h1>Cadastrar</h1>
            <form onSubmit={cadastra}>
               
                <input type="text" pattern="^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$" title="Apenas Letras"
                required="required" value={nome} onChange={(e)=>setNome(e.target.value)} className="form-control" placeholder="Nome" />
                <br />
                
                <input type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="999.999.999-99"
                required="required" value={cpf} onChange={(e)=>setCpf(e.target.value)} className="form-control" placeholder="CPF no formato 999.999.999-99" />
                <br />
                
                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="email@email.com"
                required="required" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="E-mail" />
                <br />
                
                <input type="password" required="required" minLength="6"
                value={senha} onChange={(e)=>setSenha(e.target.value)} className="form-control" placeholder="Senha com no mínimo 6 dígitos" />
                <br />
                
                <input type="date" pattern="[0-9]{2}\/[0-9]{2}\/[0-9]{4}$"
                required="required" value={datanascimento} onChange={(e)=>setDatanascimento(e.target.value)} className="form-control" placeholder="Data de nascimento" />
                <br />             
                <input type="text" pattern="\([0-9]{2}\) [0-9]{4,6}-[0-9]{4}$" title="(99) 99999-9999"
                required="required" value={telefone} onChange={(e)=>setTelefone(e.target.value)} className="form-control" placeholder="Telefone no formato (99) 99999-9999" />
                <br />  
                <button type="submit" className="btn btn-primary">Cadastrar</button>   
            </form> 
        </div>
           
        </>
    )
}

export default Register
