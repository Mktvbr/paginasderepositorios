import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'

import Main from './pages/Main'
import Repositorio from './pages/Repositorio'

//cria as rotas
export default function Rout() {
    return(
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Main/>}/>
                <Route  path='/repositorio/:repositorio' element={<Repositorio/>}/>
            </Routes>
        </BrowserRouter>
    )
}