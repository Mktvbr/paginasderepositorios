import React, { useEffect, useState} from "react";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, Filter } from "./styles";
import { useParams } from 'react-router-dom';
import { FaArrowLeft} from 'react-icons/fa'
import api from '../../services/api';

export default function Repositorio() {

    const { repositorio } = useParams()
    const [repoData, setRepoData] = useState({})
    const [issues, setIssues] = useState([])
    const [ loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('open')

    
    
    //toda vez que o repositorio ou filtro de issues
    //forem alterados, as requisições serão feitas novamente
    useEffect(()=> {
        async function load() {
            const nomeRepo = repositorio

            //faz com que as requisições aconteçam ao mesmo tempo
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filter,
                        per_page: 5
                    }
                })
            ])
            
            //atualiza os estados(useState) com as requisições recebidas
            setRepoData(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }

        load()

    }, [repositorio, filter])


    //faz a requisação dos issues
    useEffect(() => {
        async function loadIssue(){
            const nomeRepo = repositorio

            //faz a requisição que será usada na lista
            // e passa a quantidade por página
            const res = await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: filter,
                    page,
                    per_page: 5
                }
            })

            setIssues(res.data)
        }

        loadIssue()
    }, [repositorio, page, filter])


    //faz o a verificação de qual botão foi clicado
    //  e retorna ou passa a pagina 
    function  handlePage(action){
        setPage(action === 'back' ? page -1 : page +1)
    }

    //muda o filtro de issues dependendo do botão
    //clicado e retorna a page
    function handleFilter(filter){
        setFilter(filter)
        setPage(1)

    }

    
    return(

        //verifica se o container já foi carregado
        //caso ainda não tenha sido aparece um mensagem 
        loading ? 
            <Loading>
            <h1>
                carregando...
            </h1>
            </Loading>
            :  
        <Container>

            {/* componente do botão para voltar para a home */}
            <BackButton to='/'>
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>

            {/* componente do perfil do repositório */}
            <Owner>
                <img 
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                />
                <h1>{repoData.name}</h1>
                <p>{repoData.description}</p>
            </Owner>

            {/* componente do filtro de issues */}
            <Filter>
                <button type="button" 
                key='open'
                // passa o valor do filtro para a função
                onClick={() => handleFilter('open')}
                //muda a cor se o botão for clicado
                className={filter === 'open' ? 'active' : ''}
                >
                    Abrir
                </button>

                <button 
                key='closed'
                type="button" 
                // passa o valor do filtro para a função
                onClick={() => handleFilter('closed')}
                //muda a cor se o botão for clicado
                className={filter === 'closed' ? 'active' : ''}
                >
                    Fechado
                </button>
                <button 
                key='all'
                type="button" 
                // passa o valor do filtro para a função
                onClick={() => handleFilter('all')}
                //muda a cor se o botão for clicado
                className={filter === 'all' ? 'active' : ''}
                >
                    Todos
                </button>
            </Filter>

            <IssuesList>
                {/* componentes da lista de issues */}
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />

                        <div>
                            <strong>

                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label =>(
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}

                            </strong>
                                
                                <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))

                }
            </IssuesList>

            <PageActions>
                {/* componentes dos botões das paginas */}
                <button 
                type="button" 
                onClick={() => handlePage('back')}
                disabled={page < 2}
                >
                    Voltar
                </button>

                <button type="button" 
                onClick={() => handlePage('next')}
                >
                    Próxima
                </button>
            </PageActions>
            
        </Container>
        
    )
}