import { useState, useEffect } from 'react'
import { get, post } from '../api'

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([])
  const [fundos, setFundos] = useState([])
  const [membros, setMembros] = useState([])
  const [nova, setNova] = useState({valor:'', data:'', fundo:'', membroId:'', obs:''})

  useEffect(()=>{
    get('doacoes').then(setDoacoes)
    get('fundos').then(setFundos)
    get('membros').then(setMembros)
  },[])

  function adicionar() {
    post('doacoes', nova).then(d => {
      setDoacoes([...doacoes, d])
      setNova({valor:'', data:'', fundo:'', membroId:'', obs:''})
    })
  }

  return (
    <div>
      <h2>Doações</h2>
      <input type="number" placeholder="Valor" value={nova.valor} onChange={e => setNova({...nova,valor:e.target.value})}/>
      <input type="date" value={nova.data} onChange={e => setNova({...nova,data:e.target.value})}/>
      <select value={nova.fundo} onChange={e => setNova({...nova,fundo:e.target.value})}>
        <option value="">Selecione o Fundo</option>
        {fundos.map(f => <option key={f.id} value={f.nome}>{f.nome}</option>)}
      </select>
      <select value={nova.membroId} onChange={e => setNova({...nova,membroId:e.target.value})}>
        <option value="">Selecione o Membro</option>
        {membros.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
      </select>
      <input placeholder="Obs." value={nova.obs} onChange={e => setNova({...nova,obs:e.target.value})}/>
      <button onClick={adicionar}>Adicionar</button>
      <ul>
        {doacoes.map(d=> (
          <li key={d.id}>
            R$ {d.valor} em {d.data} ({d.fundo}) — Membro ID {d.membroId}. {d.obs}
          </li>
        ))}
      </ul>
    </div>
  )
}
