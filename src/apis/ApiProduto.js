const apiBase = "https://projeto-doceria-li2jvfi4ma-rj.a.run.app/api/";


const ApiProduto = {

    register:async(formData) => {
        let result = await fetch(apiBase+"addProduct", {
            method: "POST",
            body: formData
        })

        return result;         
    },

    list:async() => {

        let result = await fetch(apiBase+"listProduct");
        result = await result.json();
        return result;
    },

    delete:async(id) => {
        let result = await fetch(apiBase+"deleteProduct/"+id,{
            method:"DELETE"
        });
        result = await result.json();
        return result
    },

    seach:async(key) => {
        let result = await fetch(apiBase+"search/"+key);
        result = await result.json();
        return result

    },
    getProduct:async(id) => {
        let result = await fetch(apiBase+"getProduct/"+ Number.parseInt(id));
        result = await result.json();
        return result

    },

    update:async(id, formData) => {
        let result = await fetch(apiBase+"updateProduct/"+id+"?_method=PUT", {
            method: "POST",
            body: formData
        })

        return result;         
    }



}
export default ApiProduto