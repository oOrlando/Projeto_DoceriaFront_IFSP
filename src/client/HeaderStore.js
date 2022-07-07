import { Container, Navbar, Nav, NavDropdown, Carousel, OverlayTrigger, Tooltip, Form, FormControl, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GrUserAdd, GrUserExpert } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";
import { useEffect, useState } from 'react';


function HeaderStore({abremodal}) {

    const navegate = useNavigate();
    const [key, setKey] = useState('')
    let user = JSON.parse(localStorage.getItem("user-info"))


    function Logout() {
        localStorage.clear();
        navegate("/")
    }

    function search() {
        navegate("/" + key)
    }

    async function count(){
       
        
    }

    return (
        <>

            <div>
                <Navbar bg="primary" expand="lg" variant="light">
                    <Container fluid>
                        <Navbar.Brand href="/">Doceria</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/quem">Quem somos</Nav.Link>
                                <Nav.Link href="/">Produtos</Nav.Link>
                            </Nav>

                            {
                                !localStorage.getItem('user-info') ?
                                    <>

                                        <NavDropdown id="navbarScrollingDropdown" title={<GrUserAdd size="25" />} >
                                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                            <NavDropdown.Item href="/register">Cadastrar</NavDropdown.Item>
                                        </NavDropdown>
                                        

                                    </>
                                    :
                                    <>
                                        <Navbar.Brand>Olá {user && user.nome}</Navbar.Brand>
                                        <NavDropdown id="navbarScrollingDropdown" title={<GrUserExpert size="25" />}>
                                        <NavDropdown.Item href="/perfil">Minha Conta</NavDropdown.Item>
                                        <NavDropdown.Item href="/compras">Meus Pedidos</NavDropdown.Item>
                                            <NavDropdown.Item onClick={Logout}>Sair</NavDropdown.Item>
                                        </NavDropdown>
                                        

                                    </>

                            }
                            <OverlayTrigger key='bottom' placement='bottom' overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                {localStorage.getItem('itens-info') ?
                                                    <>
                                                       {
                                                           JSON.parse(localStorage.getItem('itens-info')).map((itens) =>
                                                           <p key={Math.random()}>{itens.qtd} - {itens.nome}</p>
                                                           )
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        CARRINHO VAZIO
                                                    </>
                                                }

                                            </Tooltip>
                                        }
                                        >
                                            <Button  onClick={() => abremodal(true)}><BsFillCartFill size="25" color="black"/></Button>
                                        </OverlayTrigger>

                            <Form className="d-flex" onSubmit={() => (search())}>
                                <FormControl type="search" onChange={(e) => setKey(e.target.value)} placeholder="Pesquisar" className="me-2" aria-label="Pesquisar" />
                                <Button type="submit" variant="outline-dark">Pesquisar</Button>
                            </Form>
                            

                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./img/promocoes.jpg"
                            alt="Promoções especiais" />
                        <Carousel.Caption>
                            <h3>Promoções</h3>
                            <p>Toda semana promoções especiais para vocês</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./img/doces.jpg"
                            alt="Doces deliciosos" />

                        <Carousel.Caption>
                            <h3>Doces</h3>
                            <p>Grande variedade de doces para todos os gostos</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./img/bebidas.jpg"
                            alt="Bebidas diversas" />

                        <Carousel.Caption>
                            <h3>Bebidas</h3>
                            <p>Grande variedade de bebidas de diversos sabores</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    )
}

export default HeaderStore
