 import { useEffect, useState } from 'react'
import './style.css'

import Lixeira from '../../assets/lixeira.svg'

import api from '../../services/api'
import { useEffect } from 'react'

function Home(){
  
  const [usuarios, setUsuarios] = useState([])
  //let usuarios =[]

  async function getUsuarios(params) {
    const usuariosDaApi = await api.get('/cadastro')
    //setUsuarios = usuariosDaApi.data 
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  useEffect(()=>{
    getUsuarios()
  })

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