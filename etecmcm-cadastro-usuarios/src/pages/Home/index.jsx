
import './style.css'
import Lixeira from '../../assets/lixeira.png' 
import Editar from '../../assets/editar.png'
import api from '../../services/api.js'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  //let usuarios = []

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  //console.log(inputNome.current.value)
  
  async function getUusuarios(){
    const usuariosDaApi = await api.get('/cadastro')
    //setUsuarios = usuariosDaApi.data
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }


  async function createUsuarios(){
    await api.post('/cadastro', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUusuarios()
  }

  async function deleteUsuarios() {
    await api.delete('/cadastro/:id')
    getUusuarios()
  }

  async function updateUsuarios() {
    await api.put('/cadastro/:id', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUusuarios()
  }


  useEffect(()=>{
    getUusuarios()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
            <input placeholder='Digite seu nome' name='nome' type="text" ref={inputNome} />
            <input placeholder='Digite sua idade' name='idade' type="number" ref={inputIdade} />
            <input placeholder='Digite seu email' name='email' type="email" ref={inputEmail} />
        <button type='button' onClick={createUsuarios}>Cadastrar</button>
      </form>
      
      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button onClick={ () => deleteUsuarios(usuario.id) }>
            <img src={Lixeira} />
          </button>
          <button onClick={ () => updateUsuarios(usuario.id) }>
            <img src={Editar} />
          </button>
        </div>
      ))}
    </div>
  )

}
export default Home
