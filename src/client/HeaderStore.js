import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button, Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GrUserAdd, GrUserExpert } from "react-icons/gr";
import { BsFillCartFill } from "react-icons/bs";



function HeaderStore() {
  
    const navegate = useNavigate();

    function Logout(){
        localStorage.clear();
        navegate("/")   
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
                                <Nav.Link href="#action2">Quem somos</Nav.Link>
                                <NavDropdown title="Produtos" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Doces</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Bebidas</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Promoções</NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                            
                            {
                            !localStorage.getItem('user-info') ?
                            <>
                            <NavDropdown id="navbarScrollingDropdown" title= {<GrUserAdd size="25" />} >
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">Cadastrar</NavDropdown.Item>
                             </NavDropdown>
                       
                            </>
                            :
                            <>
                            <NavDropdown id="navbarScrollingDropdown" title= {<GrUserExpert size="25"/>} >
                                <NavDropdown.Item onClick={Logout}>Sair</NavDropdown.Item>
                            </NavDropdown>
                         
                            </>                      
                            
                            }
                            
                            <Nav.Link href="#action6"><BsFillCartFill size="25" color="black" /></Nav.Link>

                            <Form className="d-flex">
                                <FormControl type="search" placeholder="Pesquisar" className="me-2" aria-label="Pesquisar" />
                                <Button variant="outline-dark">Pesquisar</Button>
                            </Form>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div>
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