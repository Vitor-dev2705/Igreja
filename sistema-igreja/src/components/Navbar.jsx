export default function Navbar({ setPagina }) {
  return (
    <nav>
      <button onClick={() => setPagina('dashboard')}>Dashboard</button>
      <button onClick={() => setPagina('membros')}>Membros</button>
      <button onClick={() => setPagina('doacoes')}>Doações</button>
      <button onClick={() => setPagina('despesas')}>Despesas</button>
      <button onClick={() => setPagina('fundos')}>Fundos</button>
      <hr/>
    </nav>
  )
}
