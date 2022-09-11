import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from '../../services/api'

import './filme-info.css'

import { toast } from 'react-toastify'



function Filme(){

    const {id} = useParams();
    const navigation = useNavigate()
    const [filme,setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: "d63fed1f835efaf9b268c9e61b30ce9c",
                    language: "pt-BR",
                }
            }).then((response) =>{
                setFilme(response.data);
                setLoading(false);
            }).catch(()=>{

                navigation("/", {replace: true})
                return;
            })
        }
        loadFilme();

        return()=>{
            console.log("desmontado")
        }
    }, [navigation,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JA EXISTE");
        }else{
            filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
            toast.success("FILME SALVO COM SUCESSO")
        }

    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>Avaliação: {filme.vote_average} / 10</span>
      
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>

                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;