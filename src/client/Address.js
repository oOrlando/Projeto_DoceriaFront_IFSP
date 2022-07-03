import HeaderStore from './HeaderStore'
import ApiEndereco from '../apis/ApiEndereco';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Address() {


    useEffect(() => {


    }, [])

    let user = JSON.parse(localStorage.getItem("user-info"))
    const navegate = useNavigate();

    const [logradouro, setLogradouro] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [cep, setCep] = useState("")
    const [tipoendereco, setTipoEnd] = useState("residencia")
    let usuario_id = user.id

    async function cadastra(e) {
        e.preventDefault();

        if (localStorage.getItem('user-info') && user.tipousuario === "admin") {
            navegate("/admin")
        }

        let registro = { logradouro, numero, complemento, bairro, cidade, cep, tipoendereco, usuario_id }
        console.warn(registro)

        ApiEndereco.cadastra(registro)

        

        navegate("/")

    }


    return (
        <>
            {
                
                        <HeaderStore />
              


            }


            <div className="col-sm-6 offset-sm-3">
                <h1>Cadastrar Endereço</h1>
                <form onSubmit={cadastra}>
                    <input type="text" required="required" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} className="form-control" placeholder="Logradouro" />
                    <br />
                    <input type="number" required="required" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control" placeholder="Nº" />
                    <br />
                    <input type="text" required="required" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="form-control" placeholder="Complemento" />
                    <br />
                    <input type="text" required="required" value={bairro} onChange={(e) => setBairro(e.target.value)} className="form-control" placeholder="Bairro" />
                    <br />
                    <input type="text" required="required" value={cidade} onChange={(e) => setCidade(e.target.value)} className="form-control" placeholder="Cidade" />
                    <br />
                    <input type="text" required="required" value={cep} onChange={(e) => setCep(e.target.value)} className="form-control" placeholder="CEP" />
                    <br />
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>

        </>
    )
}

export default Address