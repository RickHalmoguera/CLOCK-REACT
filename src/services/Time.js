const API_URL ='http://worldtimeapi.org/api/ip'


export async function getTime(props){
    try{
        const response = await fetch(`${API_URL}`)
        const data = await response.json()
        return data

    }catch(error){
        return error
    }
}
