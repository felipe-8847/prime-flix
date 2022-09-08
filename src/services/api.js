import axios from 'axios';

// exemplo: https://api.themoviedb.org/3
// rotas: /movie/550?api_key=d63fed1f835efaf9b268c9e61b30ce9c



const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;