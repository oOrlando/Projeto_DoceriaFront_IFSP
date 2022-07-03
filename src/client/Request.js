import HeaderStore from './HeaderStore'
import Container from 'react-bootstrap/Container'
import { Button, Table } from 'react-bootstrap'
import { React, useState, useEffect } from 'react'



function Request() {


    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState([]);


    useEffect(() => {
        getData()

    }, [])


    async function getData() {

        setItens(JSON.parse(localStorage.getItem('itens-info')))
        setPedido(JSON.parse(localStorage.getItem('request-info')))
      

    }

    return (

        <>
            <HeaderStore />
            <div>
                <h3>Finalizar Pedido</h3>
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
                                        <td><img style={{ width: 60 }} src={"http://localhost/" + item.imagem} /></td>
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



            </div>
        </>

    )
}

export default Request