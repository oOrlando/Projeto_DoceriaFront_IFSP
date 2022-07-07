const apiBase = "https://projeto-doceria-li2jvfi4ma-rj.a.run.app/api/";


const ApiPedido = {

    register:async(registro) => {
        let result = await fetch(apiBase+"registerPedido",{
            method: 'POST',
            body:JSON.stringify(registro),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })

        result = await result.json()  
        return result
        
    },
    searchPedido:async(id) => {
        let result = await fetch(apiBase+"searchPedido/"+id);
        result = await result.json();
        return result

    }
}
export default ApiPedido
