import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ApiProduto from '../apis/ApiProduto';

function UpdateProduct() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [preco, setPreco] = useState("");
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [descrição, setDescricao] = useState("");
    const [estoque_minimo, setEstmin] = useState("");
    const [estoque_maximo, setEstMax] = useState("");
    const [qtd_estoque, setEstatual] = useState("");
    const navegate = useNavigate();

    async function getData() {
        let result = await ApiProduto.getProduct(id)
        
        setData(result);
        setPreco(result.preco);
        setNome(result.nome);
        setImagem(result.imagem);
        setDescricao(result.descrição);
        setEstmin(result.estoque_minimo);
        setEstMax(result.estoque_maximo);
        setEstatual(result.qtd_estoque);
    };

    useEffect(() => {
        getData();
    }, [])

    async function editProduct(id, e){

        e.preventDefault();

        const formData = new FormData();
        formData.append('preco', preco);
        formData.append('nome', nome);
        formData.append('imagem', imagem);
        formData.append('descrição', descrição);
        formData.append('estoque_minimo', estoque_minimo);
        formData.append('estoque_maximo', estoque_maximo);
        formData.append('qtd_estoque', qtd_estoque);

        let result = ApiProduto.update(id, formData)
        console.warn(result)
        alert("Produto atualizado com sucesso")  
        navegate("/admin");            

    }

    return (
        <>
            <Header />
            <div>
                <h1>Atualizar Produto</h1>
                <div className="col-sm-6 offset-sm-3">
                    <img src={"https://doceria.s3.sa-east-1.amazonaws.com/" + data.imagem} style={{ width: 300 }} />
                    <form onSubmit={(e)=>editProduct(data.id, e)}>
                        <input type="number" pattern="([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$" title="99,99"
                        required="required" step="any" onChange={(e) => setPreco(e.target.value)} defaultValue={data.preco} className="form-control" />
                        <br />
                        <input type="text" pattern="^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$" title="Apenas Letras"
                        required="required" onChange={(e) => setNome(e.target.value)} defaultValue={data.nome} className="form-control" />
                        <br />
                        <input type="file" onChange={(e) => setImagem(e.target.files[0])} defaultValue={data.imagem} className="form-control" placeholder="Imagem" />
                        <br />
                        <input type="text" required="required" onChange={(e) => setDescricao(e.target.value)} defaultValue={data.descrição} className="form-control" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstmin(e.target.value)} defaultValue={data.estoque_minimo} className="form-control" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstMax(e.target.value)} defaultValue={data.estoque_maximo} className="form-control" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstatual(e.target.value)} defaultValue={data.qtd_estoque} className="form-control" />
                        <br />
                        <button type="submit" className="btn btn-success">Atualizar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
