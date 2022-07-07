import Header from './Header'
import ApiProduto from '../apis/ApiProduto.js'
import {React, useState, useEffect} from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import Footer from '../client/Footer'


function ProductList() {

    const [data, setData] = useState([]);
    let user=JSON.parse(localStorage.getItem("user-info"));
    const navegate=useNavigate();

    useEffect( () => {
        if (localStorage.getItem("user-info") && user.tipousuario==="admin"){
            getData();    
        }
        else if (localStorage.getItem("user-info") && user.tipousuario==="client") {
            navegate("/")
        } else {
            navegate("/login")
        }
               
    },[])

    
    async function getData(){
     
        let result = await ApiProduto.list();
       
        setData(result)

    }

    async function deleteOperation(id){
        
        let result = await ApiProduto.delete(id);
        console.warn(result);
        getData();
    }

    async function search(key){
        if(key){
            let result = await ApiProduto.seach(key);
            setData(result);
        }
        else{
            getData()
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
           
                <Container>
                
                    <Row>
                        <Col><strong>ID</strong></Col>
                        <Col><strong>Foto</strong></Col>
                        <Col><strong>Preço</strong></Col>
                        <Col><strong>Nome</strong></Col>
                        <Col><strong>Descrição</strong></Col>
                        <Col><strong>Estoque Mínimo</strong></Col>
                        <Col><strong>Estoque Máximo</strong></Col>
                        <Col><strong>Estoque Atual</strong></Col>
                        <Col sm={3}><strong>Operações</strong></Col>
                    </Row>
                    {
                        data.map((item) =>
                            <Row key={Math.random()}>
                                <Col>{item.id}</Col>
                                <Col><img style={{ width: 60 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + item.imagem} /></Col>                               
                                <Col>R$ {item.preco}</Col>
                                <Col>{item.nome}</Col>
                                <Col>{item.descrição}</Col>
                                <Col>{item.estoque_minimo}</Col>
                                <Col>{item.estoque_maximo}</Col>
                                <Col>{item.qtd_estoque}</Col>
                                <Col>
                                    <Link to={"../update/"+item.id}>
                                        <Button variant="outline-success">Editar</Button>
                                    </Link>
                                                                 
                                </Col>
                                <Col>
                                <Button variant="outline-danger" onClick={()=>deleteOperation(item.id)}>Excluir</Button>   
                                </Col>
                            </Row>
                        )
                    }
                  
                </Container><br />
                <Footer />
   


        </div>
      
    )
}

export default ProductList
