import HeaderStore from './HeaderStore'
import { Button, Container, Row, Col, Card, FloatingLabel, Accordion } from 'react-bootstrap'
import { React, useState, useEffect } from 'react'
import ApiUsuario from '../apis/ApiUsuario';
import ApiPedido from '../apis/ApiPedido'
import { useNavigate } from 'react-router-dom'
import { IoIosCart } from "react-icons/io";
import ApiItens from '../apis/ApiItens';
import ApiProduto from '../apis/ApiProduto';
import Footer from './Footer';



function Compras() {


    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [produto, setProduto] = useState([])
    let user = JSON.parse(localStorage.getItem('user-info'))

    const navegate = useNavigate();


    async function getData() {
        let pedidos = await ApiPedido.searchPedido(user.id)
        setPedido(pedidos)
        let prod = await ApiProduto.list()
        setProduto(prod)

    }

    async function getItens(id){
        let item = await ApiItens.searchItens(id)
        setItens(item)
    }



    useEffect(() => {
        getData()

    }, [])

    return (

        <>
            <HeaderStore />
            <div>
                <h3>Compras realizadas</h3>
                
                {
                pedido.map((pedidos) =>
                <Accordion flush key={pedidos.id}>
                    <Accordion.Item eventKey="1"  onClick={(e)=>getItens(pedidos.id)}>
                        <Accordion.Header ><IoIosCart size="50" /> <strong> PEDIDO: {pedidos.id} - Data: {pedidos.datacompra} - R$ {pedidos.valor.toFixed(2).toString().replace(".", ",")}</strong></Accordion.Header>
                        <Accordion.Body >
                        <Container>
                            {
                                itens.map((item) =>
                                
                                    <Row key={Math.random()}>
                                        <Col>{item.produto_id}</Col>                                    
                                        
                                        {
                                            produto.map((prods) =>
                                            
                                            prods.id === item.produto_id ?                                            
                                            <>
                                            <Col key={Math.random()}><img style={{ width: 60 }} key={Math.random()} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + prods.imagem} /></Col>
                                            <Col>{prods.nome}</Col>
                                            </>
                                            :
                                            <>
                                            </>
                                        )}
                                        
                                    </Row>
                                

                            )}
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>                   
                </Accordion>
                )}
 



            </div><br />
            <Footer />
        </>

    )
}

export default Compras
