import {Container, Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function Header()
{
    return(
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Doceria</Navbar.Brand>
                    <Nav className="me-auto navbar_warap">
                        {
                        localStorage.getItem('user-info') ?
                        <>
                        <Link to="/add">Adicionar Produtos</Link>
                        <Link to="/update">Atualizar Produtos</Link>                        
                        </>
                        :
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Cadastrar</Link>  
                        </>                    
                        }                             
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header