import './style.css'
import Lixeira from '../../assets/lixeira.png' 
import Editar from '../../assets/editar.png'
import api from '../../services/api.js'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [editingId, setEditingId] = useState(null)
  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  async function getUusuarios(){
    try {
      const usuariosDaApi = await api.get('/cadastro')
      setUsuarios(usuariosDaApi.data)
    } catch (err) {
      console.error('Erro ao buscar usuários:', err)
    }
  }

  async function handleSubmit() {
    const payload = {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    }

    try {
      if (editingId) {
        // Atualiza
        const res = await api.put(`/cadastro/${editingId}`, payload)
        console.log('Atualizado:', res.data)
        setEditingId(null)
      } else {
        // Cria
        const res = await api.post('/cadastro', payload)
        console.log('Criado:', res.data)
      }
      // limpa inputs e recarrega lista
      inputNome.current.value = ''
      inputIdade.current.value = ''
      inputEmail.current.value = ''
      getUusuarios()
    } catch (err) {
      // Mostra erro no console pra debugar (você pode mostrar na UI depois)
      console.error('Erro ao criar/atualizar:', err.response?.data || err.message)
    }
  }

  async function deleteUsuarios(id) {
    try {
      await api.delete(`/cadastro/${id}`)
      getUusuarios()
    } catch (err) {
      console.error('Erro ao deletar:', err.response?.data || err.message)
    }
  }

  // botão editar: popula os inputs e seta editingId
  function startEdit(usuario) {
    inputNome.current.value = usuario.nome
    inputIdade.current.value = usuario.idade
    inputEmail.current.value = usuario.email
    setEditingId(usuario.id)
    // foco no nome para facilitar
    inputNome.current.focus()
  }

  useEffect(()=>{
    getUusuarios()
     
  }, [])

  return (
    <div className="container">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name='nome' type="text" ref={inputNome} />
        <input placeholder='Digite sua idade' name='idade' type="number" ref={inputIdade} />
        <input placeholder='Digite seu email' name='email' type="email" ref={inputEmail} />
        <button type='submit'>{editingId ? 'Salvar alterações' : 'Cadastrar'}</button>
        {editingId && <button type='button' onClick={() => { setEditingId(null); inputNome.current.value=''; inputIdade.current.value=''; inputEmail.current.value=''; }}>Cancelar</button>}
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button onClick={ () => deleteUsuarios(usuario.id) }>
            <img src={Lixeira} alt="delete" />
          </button>
          <button onClick={ () => startEdit(usuario) }>
            <img src={Editar} alt="edit" />
          </button>
        </div>
      ))}
    </div>
  )
}
export default Home
