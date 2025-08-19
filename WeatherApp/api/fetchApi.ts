// const API_URL = 'http://localhost:3000'
const API_URL = 'http://10.0.2.2:3000'

export async function getWeather(city: string) {
    console.log("getWeather called")
    try { const response = await fetch(`${API_URL}/weather/${city}`) } catch (e) {console.error(e)}
}