const apiBase = "https://projeto-doceria-li2jvfi4ma-rj.a.run.app/api/";


const ApiItens = {

    register:async(registro) => {
        let result = await fetch(apiBase+"registerItens",{
            method: 'POST',
            body:JSON.stringify(registro),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })

        result = await result.json()  
        return result
    }

}
export default ApiItens