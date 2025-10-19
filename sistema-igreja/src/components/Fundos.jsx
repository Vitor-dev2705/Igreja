import { useState, useEffect } from 'react'
import { get, post } from '../api'

export default function Fundos() {
  const [fundos, setFundos] = useState([])
  const [novo, setNovo] = useState({nome:''})

  useEffect(()=>{ get('fundos').then(setFundos) }, [])

  function adicionar() {
    post('fundos', novo).then(f => {
      setFundos([...fundos, f])
      setNovo({nome:''})
    })
  }

  return (
    <div>
      <h2>Fundos</h2>
      <input placeholder="Nome" value={novo.nome} onChange={e => setNovo({...novo,nome:e.target.value})}/>
      <button onClick={adicionar}>Adicionar</button>
      <ul>
        {fundos.map(f=> <li key={f.id}>{f.nome}</li>)}
      </ul>
    </div>
  )
}
