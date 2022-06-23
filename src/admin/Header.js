import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'


function Header()
{
    let user=JSON.parse(localStorage.getItem("user-info"))
    const navegate = useNavigate();

    function Logout(){
        localStorage.clear();
        navegate("/login")   
    }

    return(
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/admin">Doceria</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                        localStorage.getItem('user-info') ?
                            <>
                                <Nav.Link href="/register">Cadastrar Usuário</Nav.Link>   
                                <Nav.Link href="/add">Cadastrar Produto</Nav.Link>
                                <Nav.Link href="/admin">Produtos</Nav.Link>                                                   
                            </>
                            :
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>                                
                            </>                    
                        }                             
                    </Nav>
                    {
                    localStorage.getItem('user-info')?  
                    <Nav>
                        <NavDropdown title={user && user.nome}>
                            <NavDropdown.Item onClick={Logout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>  
                    :null
                    }
                </Container>
            </Navbar>
        </div>
    )
}

export default Header