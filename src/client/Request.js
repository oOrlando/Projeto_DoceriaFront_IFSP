import HeaderStore from './HeaderStore'
import { Button, Container, Row, Col, Card, FloatingLabel, Accordion } from 'react-bootstrap'
import { React, useState, useEffect } from 'react'
import ApiUsuario from '../apis/ApiUsuario';
import ApiPedido from '../apis/ApiPedido'
import { useNavigate } from 'react-router-dom'
import { IoIosCard } from "react-icons/io";
import { IoQrCodeSharp } from "react-icons/io5";
import { ImBarcode } from "react-icons/im";
import ApiItens from '../apis/ApiItens';
import Footer from './Footer'



function Request() {


    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState([]);
    let forma_pagamento_id = 1;

    const navegate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function getData() {

        carrega()

    }

    function carrega() {
        if (localStorage.getItem('request-info') && localStorage.getItem('itens-info')) {
            setItens(JSON.parse(localStorage.getItem('itens-info')))
            setPedido(JSON.parse(localStorage.getItem('request-info')))
        } else {
            navegate('/')
        }
    }

    async function registerPedido() {
        let user = JSON.parse(localStorage.getItem('user-info'));
        if (localStorage.getItem('user-info') && localStorage.getItem('itens-info')) {
       
            let datacompra = pedido.datacompra
            let valor = pedido.valor
            let situacao = pedido.situacao
            let usuario_id = user.id
            let res = { datacompra, valor, situacao, usuario_id, forma_pagamento_id }
            let request = await ApiPedido.register(res)              
  
                registerItens(request.id)
                navegate("/compras")           

        } else {
            alert("carrinho vazio")
        }
       

    }

    async function registerItens(id) {

        let pedido_id = id;
        for (let i = 0; itens.length; i++) {
            let produto_id = itens[i].id;
            let qtd = itens[i].qtd;
            let valor = itens[i].subtotal

            let res = { pedido_id, produto_id, qtd, valor }
            ApiItens.register(res)
            localStorage.removeItem('request-info')
            localStorage.removeItem('itens-info')
        }
       

    }

    async function login() {
        let registro = { email, senha };
        const result = await ApiUsuario.login(registro);
        if (result.id) {
            localStorage.setItem("user-info", JSON.stringify(result));
            getData()
        }
        else {
            alert(JSON.stringify(result.error))
        }
    }

    async function cadastrar() {
        navegate('/register/' + 1)
    }

    async function formaPagamento(num) {
        forma_pagamento_id = num
    }

    useEffect(() => {
        getData()

    }, [])

    return (

        <>
            <HeaderStore />
            <div>
                <h3>Finalizar Pedido</h3>

                {
                    localStorage.getItem('user-info') ?

                        <>
                            <Container>


                                <Row>
                                    <Col><strong>Foto</strong></Col>
                                    <Col><strong>Preço</strong></Col>
                                    <Col><strong>Produto</strong></Col>
                                    <Col><strong>Quantidade</strong></Col>
                                    <Col><strong>Subtotal</strong></Col>

                                </Row>
                                {

                                    itens.map((item) =>

                                        <Row key={Math.random()}>
                                            <Col><img style={{ width: 100 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + item.imagem} /></Col>
                                            <Col>R$ {item.preco.toFixed(2).toString().replace(".", ",")}</Col>
                                            <Col>{item.nome}</Col>
                                            <Col>{item.qtd}</Col>
                                            <Col>R$ {item.subtotal.toFixed(2).toString().replace(".", ",")}</Col>
                                        </Row>

                                    )}


                                <h3><strong>TOTAL:</strong> R$ {Number(pedido.valor).toFixed(2).toString().replace(".", ",")}</h3>
                                <h3>Forma de Pagamento</h3>
                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="1" onClick={(e) => formaPagamento(1)}>
                                        <Accordion.Header ><IoIosCard size="50" /> <strong> CARTÃO DE CRÉDITO</strong></Accordion.Header>
                                        <Accordion.Body>
                                            Você Escolheu Cartão de Crédito<br />
                                            <img style={{ width: 165 }} src="img/cartao.png" />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" onClick={(e) => formaPagamento(2)}>
                                        <Accordion.Header ><IoQrCodeSharp size="50" /> <strong> PIX</strong></Accordion.Header>
                                        <Accordion.Body>
                                            Você Escolheu PIX<br />
                                            <img style={{ width: 165 }} src="img/pix.jpg" />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3" onClick={(e) => formaPagamento(3)}>
                                        <Accordion.Header ><ImBarcode size="50" /> <strong> BOLETO BANCÁRO</strong></Accordion.Header>
                                        <Accordion.Body>
                                            Você Escolheu Boleto Bancário<br />
                                            <img style={{ width: 165 }} src="img/boleto.png" />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Button size="lg" variant="secondary">Cancelar</Button>
                                        </Col>
                                        <Col>
                                            <Button size="lg" variant="success" onClick={() => (registerPedido())}>Comprar</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Container>

                        </>
                        :
                        <>
                            <Container>
                                <Row>

                                    <Col>
                                        <Card className="text-center">
                                            <Card.Header>Já sou cliente</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Fazer Login</Card.Title>
                                                <Card.Text>
                                                </Card.Text>
                                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
                                                    <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} className='form-control' />
                                                </FloatingLabel>
                                                <br />
                                                <FloatingLabel controlId="floatingInput" label="Senha" className="mb-3" >
                                                    <input type="password" placeholder='Senha' onChange={(e) => setSenha(e.target.value)} className='form-control' />
                                                </FloatingLabel>
                                                <br />
                                                <button className='btn btn-primary' onClick={login}>Entrar</button>

                                            </Card.Body>
                                            <Card.Footer className="text-muted"></Card.Footer>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="text-center">
                                            <Card.Header>Cadastar</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Cadastre-se</Card.Title>
                                                <Card.Text>
                                                    Faça seu cadastro clicando no botão cadastrar.
                                                </Card.Text>
                                                <img style={{ width: 165 }} src="img/cadastro.png" />
                                                <br />
                                                <Button variant="primary" onClick={() => (cadastrar())}>Cadastrar</Button>
                                            </Card.Body>
                                            <Card.Footer className="text-muted"></Card.Footer>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                }

            </div><br />
            <Footer />
        </>

    )
}

export default Request
