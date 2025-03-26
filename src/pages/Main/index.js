import React, {useState, useCallback, useEffect}from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import {Container, Form, SubmitButton, List, DeleteButtom} from "./style.js"
import {Link} from 'react-router-dom'

import api from '../../services/api.js'

export default function Main() {

    const [newRepo,  setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState(() => {
        // busca do localStorage os repositorios salvos
        // para sempre que o site for aberto já estejam lá
        const repoStorage = localStorage.getItem('repos')
        return repoStorage ? JSON.parse(repoStorage) : []
    })
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    // salva os repositórios no localStorage
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])

    const handleSubmit = useCallback((e)=>{
        // evita o carregamento da página
        e.preventDefault()
        setAlert(null)


        async function submit() {
            setLoading(true)
            
            try{

                // se o usuário clicar no submit sem colocar um repositório
                // responde com um erro
                if(newRepo === ""){
                    throw new Error('você precisa indicar um repositorio')
                }

                // busca o repositório digitado
                const hasRepo = repositorios.find(repo => repo.name === newRepo)

                // se o repositorio for encontrado será passado um erro
                if(hasRepo){
                    throw new Error('Repositorio Duplicado')
                }

                // Faz uma requisição à API do GitHub para obter os detalhes
                // do repositório informado pelo usuário
                const response = await api.get(`repos/${newRepo}`)
    
                const data = {
                    name: response.data.full_name,
                }
        
                setRepositorios([...repositorios, data])
                setNewRepo('')
            }catch(error){
                setAlert(error)
                console.log(error)
            }finally{
                setLoading(false)
            }

        }

        submit()

    }, [newRepo, repositorios])

    // Atualiza o estado com o valor digitado no input e reseta o alerta de erro
    function handleinputChange(e){
        setNewRepo(e.target.value)
        setAlert(null)
    }

    // Filtra os repositórios criando um novo array
    // sem o repositorio que foi passado
    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !==repo)
        setRepositorios(find)
    }, [repositorios])


    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositorios
            </h1> 

            {/* formulário para adicionar os repositórios com as funções criadas */}
            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                type="text" 
                placeholder="Adicionar Repositorios"
                value={newRepo}
                onChange={handleinputChange}
                />

                <SubmitButton  loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#fff" size={14}/>
                    ) : (
                        <FaPlus color="#fff" size={14}/>
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButtom onClick = { () => handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButtom>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>
        </Container>


    )
}