
import HeaderStore from './client/HeaderStore'
import React  from 'react'
import Footer from './client/Footer'

function userUpdate(){

    

    let user = JSON.parse(localStorage.getItem('user-info'));


    
    
    return(
        <>
        {          
             <HeaderStore /> 
        }        
        
        <div className="col-sm-6 offset-sm-3">
            <h1>Meus Dados</h1>
            <form >
               
                <input type="text" title="Apenas Letras"
                required="required" value={user.nome} disabled className="form-control" placeholder="Nome" />
                <br />
                
                <input type="text"  title="999.999.999-99"
                required="required" value={user.cpf} disabled className="form-control" placeholder="CPF no formato 999.999.999-99" />
                <br />
                
                <input type="email" title="email@email.com"
                required="required" value={user.email}  disabled className="form-control" placeholder="E-mail" />
                <br />
                
                <input type="text"
                required="required" value={user.datanascimento} disabled className="form-control" placeholder="Data de nascimento" />
                <br />             
                <input type="text" title="(99) 99999-9999"
                required="required" value={user.telefone} disabled className="form-control" placeholder="Telefone no formato (99) 99999-9999" />
                <br />  
                <button className="btn btn-primary">Editar</button>   
            </form> 
        </div><br />
        <Footer />
       
        </>
    );
}

export default userUpdate;
