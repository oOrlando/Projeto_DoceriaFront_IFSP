import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
    

    const [preco, setPreco] = useState("");
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [descrição, setDescricao] = useState("");
    const [estoque_minimo, setEstmin] = useState("");
    const [estoque_maximo, setEstMax] = useState("");
    const [estoque_atual, setEstatual] = useState("");
    const navegate = useNavigate();

    async function cadastra(e) {

        e.preventDefault();
        console.warn(preco, nome, descrição, imagem, estoque_minimo, estoque_maximo, estoque_atual);

        const formData = new FormData();
        formData.append('preco', preco);
        formData.append('nome', nome);
        formData.append('imagem', imagem);
        formData.append('descrição', descrição);
        formData.append('estoque_minimo', estoque_minimo);
        formData.append('estoque_maximo', estoque_maximo);
        formData.append('qtd_estoque', estoque_atual);

        let result = await fetch("http://localhost:80/api/addProduct", {
            method: "POST",
            body: formData
        })

            alert("Produto salvo com sucesso")
            navegate("/admin")
            console.warn(result)

    }

    return (
        <>
            <Header />
            <div>
                <h1>Cadastrar Produto</h1>
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={cadastra}>
                        <input type="number" required="required" step="any" onChange={(e) => setPreco(e.target.value)} className="form-control" placeholder="Preço" />
                        <br />
                        <input type="text" required="required" onChange={(e) => setNome(e.target.value)} className="form-control" placeholder="Nome" />
                        <br />
                        <input type="file" required="required" onChange={(e) => setImagem(e.target.files[0])} className="form-control" placeholder="Imagem" />
                        <br />
                        <input type="textarea" required="required" onChange={(e) => setDescricao(e.target.value)} className="form-control" placeholder="Descrição" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstmin(e.target.value)} className="form-control" placeholder="Estoque Mínimo" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstMax(e.target.value)} className="form-control" placeholder="Estoque Máximo" />
                        <br />
                        <input type="number" required="required" onChange={(e) => setEstatual(e.target.value)} className="form-control" placeholder="Estoque Atual" />
                        <br />
                        <button type='submit' className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct