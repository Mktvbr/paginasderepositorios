import axios from 'axios'

// cria uma requisição http com axios para ser reutilizada
const api = axios.create({
    baseURL: 'https://api.github.com',
})

export default api