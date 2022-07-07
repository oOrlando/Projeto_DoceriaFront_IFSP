import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsYoutube, BsTwitter, BsTwitch, BsWhatsapp, BsPinterest, BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    
    
    <Container fluid className="bg-secondary text-white justify-content-around py-5">
        <Row>
        <h6>Toda semana promoções especiais para vocês!</h6>
        </Row>
        <Row>
        <Col className="text-center py-3">
           <h6>Entre em contato pelo nosso WhatsApp <BsWhatsapp size="25"/> (15) 99999-9999</h6>
            </Col> 
        </Row>
        <Row>
            <h6>Nossas Redes Sociais</h6>
            <Col className="text-center py-3">
            <BsYoutube size="25"/>
            </Col> 

            <Col className="text-center py-3">
            <BsTwitter size="25"/>
            </Col> 

            <Col className="text-center py-3">
            <BsTwitch size="25"/>
            </Col> 

            <Col className="text-center py-3">
            <BsPinterest size="25"/>
            </Col> 

            <Col className="text-center py-3">
            <BsInstagram size="25"/>
            </Col>             

    {/* Footer do Footer*/}
    <div className="footer-bottom">
    <p className="text-xs-center">
        &copy;{new Date().getFullYear()} IFSP Pós em Desenvolvimento Web
    </p>
    </div>
        </Row>
    </Container>
    

  )
}

export default Footer;
