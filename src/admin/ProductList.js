import Header from './Header'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

function ProductList() {
    const [data, setData] = useState([]);

    useEffect( () => {
            getData();        
    },[])

    
    async function getData(){
            let result = await fetch("http://localhost:80/api/listProduct");
            result = await result.json();
            setData(result)

    }

    async function deleteOperation(id){
        let result = await fetch("http://localhost:80/api/deleteProduct/"+id,{
            method:"DELETE"
        });
        result = await result.json();
        console.warn(result);
        getData();
    }

    async function search(key){
        if(key){
            console.warn(key);
            let result = await fetch("http://localhost:80/api/search/"+key);
            result = await result.json();
            setData(result)
        }
        else{
            let result = await fetch("http://localhost:80/api/listProduct");
            result = await result.json();
            setData(result)
        }        
    }

    return (
        <div>
            <Header />
            <h1>Lista de Produtos</h1>
            <div className="col-sm-6 offset-sm-3">
                    <input type="search" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Pesquisar" />
                    <br />
            </div>
            <div className="col-sm-12">
                <Table>
                    <tbody>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td><strong>Foto</strong></td>
                        <td><strong>Preço</strong></td>
                        <td><strong>Nome</strong></td>
                        <td><strong>Descrição</strong></td>
                        <td><strong>Estoque Mínimo</strong></td>
                        <td><strong>Estoque Máximo</strong></td>
                        <td><strong>Estoque Atual</strong></td>
                        <td><strong>Operações</strong></td>
                    </tr>
                    {
                        data.map((item) =>
                            <tr key={Math.random()}>
                                <td>{item.id}</td>
                                <td><img style={{ width: 60 }} src={"http://localhost/" + item.imagem} /></td>                               
                                <td>R$ {item.preco}</td>
                                <td>{item.nome}</td>
                                <td>{item.descrição}</td>
                                <td>{item.estoque_minimo}</td>
                                <td>{item.estoque_maximo}</td>
                                <td>{item.qtd_estoque}</td>
                                <td className='col-sm-2'>
                                    <Link to={"../update/"+item.id}>
                                        <Button variant="outline-success">Editar</Button>
                                    </Link>
                                    <Button variant="outline-danger" onClick={()=>deleteOperation(item.id)}>Excluir</Button>                                
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>


        </div>
    )
}

export default ProductList