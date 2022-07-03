const apiBase = "https://projeto-doceria-li2jvfi4ma-rj.a.run.app/api/"


const ApiUsuario = {

    cadastra:async(registro) => {

        let result = await fetch(apiBase+"register",{
            method: 'POST',
            body:JSON.stringify(registro),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })

        result = await result.json()  
        return result;

    },
    
    login:async(registro) => {

        
        let result = await fetch(apiBase+"login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(registro)
        });
        result = await result.json();
        return result;

    }
}
export default ApiUsuario;