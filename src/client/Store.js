import HeaderStore from './HeaderStore'
import Container from 'react-bootstrap/Container'
import { Card, Button, Modal } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { React, useState, useEffect } from 'react'
import ApiProduto from '../apis/ApiProduto'
/* import ApiPedido from '../apis/ApiPedido' */
import { useNavigate, useParams } from 'react-router-dom'

function Store() {

    const { key } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);


    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* let user=JSON.parse(localStorage.getItem("user-info")) */
    const navegate = useNavigate();

    useEffect(() => {
        getData()

    }, [total])


    async function getData() {

        if (localStorage.getItem('itens-info') && itens.length === 0) {
            setItens(JSON.parse(localStorage.getItem('itens-info')))
        }
        if (key == null) {
            let result = await ApiProduto.list();
            setData(result)
        }else {
            let result = await ApiProduto.seach(key);
            setData(result)
        }


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


    }

    async function remover(id) {

        for (let i = 0; i < itens.length; i++) {
            if (itens[i].id === id) {
                itens.splice(i, 1)
            }
        }
        if (itens.length === 0) {
            localStorage.removeItem("itens-info")
            localStorage.removeItem("request-info")
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

    async function finish(nav) {
        let now = new Date()
        let mes = parseInt(now.getMonth()) + 1
        let datacompra = (now.getFullYear() + "-" + mes + "-" + now.getDate())

        let situacao = "carrinho";

        /* let usuario_id = Number(user.id)  */

        let valor = total
        let registro = { datacompra, valor, situacao/* , usuario_id */ }

        localStorage.setItem("request-info", JSON.stringify(registro));
        localStorage.setItem("itens-info", JSON.stringify(itens));
        /* ApiPedido.register(registro) */
        if (nav === 0) {
            handleClose()

        } else {
            navegate("/request")
        }

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

                        <Container className="table-striped ">

                            <Row>
                                <Col><strong>Foto</strong></Col>
                                <Col><strong>Preço</strong></Col>
                                <Col><strong>Produto</strong></Col>
                                <Col><strong>Quantidade</strong></Col>
                                <Col><strong>Subtotal</strong></Col>
                                <Col><strong>Remover</strong></Col>
                            </Row>
                            {

                                itens.map((item) =>
                                    <Row key={Math.random()}>
                                        <Col><img style={{ width: 60 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + item.imagem} /></Col>
                                        <Col>R$ {item.preco.toFixed(2).toString().replace(".", ",")}</Col>
                                        <Col>{item.nome}</Col>
                                        <Col className="w-25">
                                            <input id="valor" type="number" pattern="[0-9]+$" onBlur={(e) => quantidade(item.id, e.target.value)} className="form-control input-sm" defaultValue={item.qtd} min="0" />

                                        </Col>
                                        <Col>R$ {item.subtotal.toFixed(2).toString().replace(".", ",")}</Col>
                                        <Col className='col-sm-2'>
                                            <Button variant="outline-danger" onClick={() => remover(item.id)}>X</Button>
                                        </Col>
                                    </Row>
                                )}

                        </Container>
                        <h3><strong>TOTAL:</strong> R$ {total.toFixed(2).toString().replace(".", ",")}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => finish(0)}>
                            Continuar Comprando
                        </Button>
                        <Button variant="outline-success" onClick={() => finish(1)}>Finalizar Compra</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>

    )
}

export default Store