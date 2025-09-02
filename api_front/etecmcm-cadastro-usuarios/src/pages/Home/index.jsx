import './style.css'

import Lixeira from '../../assets/lixeira.svg'

function Home(){
  const usuarios =[
    {
      id: '0001',
      nome: 'Carol',
      idade: 18,
      emial: 'carol@gmail.com'
    },     {
      id: '002',
      nome: 'Isa',
      idade: 14,
    }
  ]
 
  return(
    <div className='container'>
      <form>
        <h1>Cadastro</h1>
        <input name='nome' type="text" />
        <input name='iadade' type="number" />
        <input name='email' type="email" />
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome:{usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email:{usuario.email}</p>
          </div>
          <button>
            <img src={Lixeira}/>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home