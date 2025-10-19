import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Membros from './components/Membros'
import Doacoes from './components/Doacoes'
import Despesas from './components/Despesas'
import Fundos from './components/Fundos'
import Navbar from './components/Navbar'

export default function App() {
  const [pagina, setPagina] = useState('dashboard')
  return (
    <>
      <Navbar setPagina={setPagina}/>
      <div>
        {pagina === 'dashboard' && <Dashboard/>}
        {pagina === 'membros' && <Membros/>}
        {pagina === 'doacoes' && <Doacoes/>}
        {pagina === 'despesas' && <Despesas/>}
        {pagina === 'fundos' && <Fundos/>}
      </div>
    </>
  )
}
