import HeaderStore from './HeaderStore'
import { Button, Table, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap'
import { React, useState, useEffect } from 'react'
import ApiUsuario from '../apis/ApiUsuario';
import { useNavigate } from 'react-router-dom'



function Request() {


    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState([]);

    const navegate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");





    async function getData() {

        setItens(JSON.parse(localStorage.getItem('itens-info')))
        setPedido(JSON.parse(localStorage.getItem('request-info')))


    }

    async function login() {
        console.warn(email, senha)
        let registro = { email, senha };
        const result = await ApiUsuario.login(registro);
        console.warn(result)
        if (result.id) {
            localStorage.setItem("user-info", JSON.stringify(result));
            navegate("/request")
        }
        else {
            alert(JSON.stringify(result.error))
        }
    }

    async function cadastrar() {
        navegate('/register/' + 1)
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
                                <Table className="table-striped ">
                                    <tbody>
                                        <tr>
                                            <td><strong>Foto</strong></td>
                                            <td><strong>Preço</strong></td>
                                            <td><strong>Produto</strong></td>
                                            <td><strong>Quantidade</strong></td>
                                            <td><strong>Subtotal</strong></td>

                                        </tr>
                                        {

                                            itens.map((item) =>
                                                <tr key={Math.random()}>
                                                    <td><img style={{ width: 60 }} src={"https://doceria.s3.sa-east-1.amazonaws.com/" + item.imagem} /></td>
                                                    <td>R$ {item.preco.toFixed(2).toString().replace(".", ",")}</td>
                                                    <td>{item.nome}</td>
                                                    <td>{item.qtd}</td>
                                                    <td>R$ {item.subtotal.toFixed(2).toString().replace(".", ",")}</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </Table>
                                <h3><strong>TOTAL:</strong> R$ {Number(pedido.valor).toFixed(2).toString().replace(".", ",")}</h3>

                                <Button variant="secondary">
                                    Cancelar
                                </Button>

                                <Button variant="outline-success">Comprar</Button>


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
                                                <img style={{ width: 165 }} src="cadastro.png" />
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




            </div>
        </>

    )
}

export default Request