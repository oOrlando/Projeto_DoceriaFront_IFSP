import HeaderStore from './HeaderStore'
import Container from 'react-bootstrap/Container'
import { Card, Button, Modal, Table } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { React, useState, useEffect } from 'react'
import ApiProduto from '../apis/ApiProduto'
/* import ApiPedido from '../apis/ApiPedido' */
import {useNavigate} from 'react-router-dom'

function Store() {


    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);


    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* let user=JSON.parse(localStorage.getItem("user-info")) */
    const navegate=useNavigate();

    useEffect(() => {
        getData()

    }, [total])
    

    async function getData() {

        if (localStorage.getItem('itens-info') && itens.length === 0){
            setItens(JSON.parse(localStorage.getItem('itens-info')))    
        }

        let result = await ApiProduto.list();
        setData(result)
        
        
        console.warn(result)

    }

    async function cart(item) {
        delete item.estoque_minimo;
        delete item.estoque_maximo;
        delete item.descrição;
        delete item.qtd_estoque;
        let indice = 0
        let resul = false

        if (itens.length === 0) {
            item.qtd = 1;
            item.subtotal = item.preco * item.qtd
            itens.push(item)


        }
        else {


            for (let i = 0; i < itens.length; i++) {
                if (itens[i].id === item.id) {
                    indice = i;
                    resul = true;

                }
            }
            if (resul) {
                itens[indice].qtd++
                itens[indice].subtotal = itens[indice].preco * itens[indice].qtd
            } else {
                item.qtd = 1;
                item.subtotal = item.preco * item.qtd
                itens.push(item)

            }




        }
        getTotal()
        handleShow();
        console.warn(itens)

    }

    async function remover(id) {

        for (let i = 0; i < itens.length; i++) {
            if (itens[i].id === id) {
                itens.splice(i, 1)
            }
        }
        getTotal()

    }

    async function quantidade(id, valor) {

        for (let i = 0; i < itens.length; i++) {
            if (itens[i].id === id) {

                itens[i].qtd = parseInt(valor)
                itens[i].subtotal = itens[i].preco * parseInt(valor)
            }
        }
        getTotal()
    }

    async function getTotal() {
        let soma = 0;
        for (let i = 0; i < itens.length; i++) {
            soma = soma + itens[i].subtotal

        }
        setTotal(soma)

    }

    async function finish(){
        let now = new Date()
        let mes = parseInt(now.getMonth())+1
        let datacompra = (now.getFullYear()+"-"+mes+"-"+now.getDate()) 
        
        let situacao = "carrinho";
       
        /* let usuario_id = Number(user.id)  */
                 
        let valor = total 
        let registro = {datacompra, valor, situacao/* , usuario_id */}

        localStorage.setItem("request-info", JSON.stringify(registro));
        localStorage.setItem("itens-info", JSON.stringify(itens));
        /* ApiPedido.register(registro) */
        console.warn(registro)
        navegate("/request") 


    }

    

    return (

        <>
            <HeaderStore />
            <div>
                <h3>Vitrine de produtos</h3>
                <Container>
                    <Row>

                        {
                            data.map((itemdata) =>
                                <Col key={Math.random()}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" style={{ height: 200 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + itemdata.imagem} />
                                        <Card.Body>
                                            <Card.Title>{itemdata.nome}</Card.Title>
                                            <Card.Text>
                                                {itemdata.descrição}
                                            </Card.Text>
                                            <Card.Title>R$ {itemdata.preco.toFixed(2).toString().replace(".", ",")}</Card.Title>
                                            <Button variant="primary" onClick={() => cart(itemdata)}>COMPRAR</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        }

                    </Row>

                </Container>
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Carrinho</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <Table className="table-striped ">
                            <tbody>
                                <tr>
                                    <td><strong>Foto</strong></td>
                                    <td><strong>Preço</strong></td>
                                    <td><strong>Produto</strong></td>
                                    <td><strong>Quantidade</strong></td>
                                    <td><strong>Subtotal</strong></td>
                                    <td><strong>Remover</strong></td>
                                </tr>
                                {

                                    itens.map((item) =>
                                        <tr key={Math.random()}>
                                            <td><img style={{ width: 60 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + item.imagem} /></td>
                                            <td>R$ {item.preco.toFixed(2).toString().replace(".", ",")}</td>
                                            <td>{item.nome}</td>
                                            <td className="w-25">
                                                <input id="valor" type="number" pattern="[0-9]+$" onBlur={(e) => quantidade(item.id, e.target.value)} className="form-control input-sm" defaultValue={item.qtd} min="0" />

                                            </td>
                                            <td>R$ {item.subtotal.toFixed(2).toString().replace(".", ",")}</td>
                                            <td className='col-sm-2'>
                                                <Button variant="outline-danger" onClick={() => remover(item.id)}>X</Button>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </Table>
                        <h3><strong>TOTAL:</strong> R$ {total.toFixed(2).toString().replace(".", ",")}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Continuar Comprando
                        </Button>
                        <Button variant="outline-success" onClick={() => finish()}>Finalizar Compra</Button>                      
                    </Modal.Footer>
                </Modal>

            </div>
        </>

    )
}

export default Store