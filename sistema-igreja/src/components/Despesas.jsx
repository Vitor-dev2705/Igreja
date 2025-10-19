import { useState, useEffect } from 'react'
import { get, post } from '../api'

export default function Despesas() {
  const [despesas, setDespesas] = useState([])
  const [fundos, setFundos] = useState([])
  const [nova, setNova] = useState({valor:'', data:'', fundo:'', categoria:'', obs:''})

  useEffect(()=>{
    get('despesas').then(setDespesas)
    get('fundos').then(setFundos)
  },[])

  function adicionar() {
    post('despesas', nova).then(d => {
      setDespesas([...despesas, d])
      setNova({valor:'', data:'', fundo:'', categoria:'', obs:''})
    })
  }

  return (
    <div>
      <h2>Despesas</h2>
      <input type="number" placeholder="Valor" value={nova.valor} onChange={e => setNova({...nova,valor:e.target.value})}/>
      <input type="date" value={nova.data} onChange={e => setNova({...nova,data:e.target.value})}/>
      <select value={nova.fundo} onChange={e => setNova({...nova,fundo:e.target.value})}>
        <option value="">Selecione o Fundo</option>
        {fundos.map(f => <option key={f.id} value={f.nome}>{f.nome}</option>)}
      </select>
      <input placeholder="Categoria" value={nova.categoria} onChange={e => setNova({...nova,categoria:e.target.value})}/>
      <input placeholder="Obs." value={nova.obs} onChange={e => setNova({...nova,obs:e.target.value})}/>
      <button onClick={adicionar}>Adicionar</button>
      <ul>
        {despesas.map(d=> (
          <li key={d.id}>
            R$ {d.valor} em {d.data} ({d.fundo}) [{d.categoria}]. {d.obs}
          </li>
        ))}
      </ul>
    </div>
  )
}
