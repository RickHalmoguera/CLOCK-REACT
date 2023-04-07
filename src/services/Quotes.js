const API_URL ='https://api.quotable.io'

export async function getRandomQuote(){
    try{
        const response = await fetch(`${API_URL}/random`)
        const data = await response.json()
        return data
    }catch(error){
        return error
    }
}
