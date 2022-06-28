const apiBase = "http://localhost:80/api/";


const ApiProduto = {

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

    }
}
export default ApiProduto