import HeaderStore from './HeaderStore'
import Container from 'react-bootstrap/Container'
import { Card, Button, Pagination } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { React, useState, useEffect } from 'react'




function Store() {


    const [data, setData] = useState([]);


    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        let result = await fetch("http://localhost:80/api/listProduct");
        result = await result.json();
        setData(result)

    }


    return (

        <>
            <HeaderStore />
            <div>
                <h3>Vitrine de produtos</h3>
                <Container>
                    <Row>

                        {
                            data.map((item) =>
                            <Col key={Math.random()}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" style={{ height: 200 }} src={"http://localhost/" + item.imagem} />
                                        <Card.Body>
                                            <Card.Title>{item.nome}</Card.Title>
                                            <Card.Text>
                                                {item.descrição}
                                            </Card.Text>
                                            <Card.Title>R$ {item.preco}</Card.Title>
                                            <Button variant="primary">COMPRAR</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                            )
                        }

                    </Row>

                </Container>

            </div>
        </>
    )
}

export default Store