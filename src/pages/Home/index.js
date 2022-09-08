import { useEffect, useState} from 'react';
import api from '../../services/api'
import{Link} from 'react-router-dom'
import './home.css'

// rotas: /movie/550?api_key=d63fed1f835efaf9b268c9e61b30ce9c


function Home(){

    const [filmes, setFimes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=> {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params: {
                    api_key: "d63fed1f835efaf9b268c9e61b30ce9c",
                    language: "pt-BR",
                    page: 1,
                }
            })

          //  console.log("res ",response)
          setFimes(response.data.results.slice(0,10))
          setLoading(false)
        }

        loadFilmes();
        
    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Caregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className='conteiner'>
            <div className='lista-filmes'>
                
            {filmes.map((filme) =>{
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}/>
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })} 
            </div>
        </div>
    )
}

export default Home;