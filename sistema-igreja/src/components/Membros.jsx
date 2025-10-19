import { useState, useEffect } from 'react'
import { get, post } from '../api'

export default function Membros() {
  const [membros, setMembros] = useState([])
  const [novo, setNovo] = useState({nome:'', email:'', telefone:''})

  useEffect(()=>{ get('membros').then(setMembros) }, [])

  function adicionar() {
    post('membros', novo).then(m => {
      setMembros([...membros, m])
      setNovo({nome:'', email:'', telefone:''})
    })
  }

  return (
    <div>
      <h2>Membros</h2>
      <input placeholder="Nome" value={novo.nome} onChange={e => setNovo({...novo,nome:e.target.value})}/>
      <input placeholder="Email" value={novo.email} onChange={e => setNovo({...novo,email:e.target.value})}/>
      <input placeholder="Telefone" value={novo.telefone} onChange={e => setNovo({...novo,telefone:e.target.value})}/>
      <button onClick={adicionar}>Adicionar</button>
      <ul>
        {membros.map(m=> <li key={m.id}>{m.nome} - {m.email} - {m.telefone}</li>)}
      </ul>
    </div>
  )
}
