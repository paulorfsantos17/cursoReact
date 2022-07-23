import styles from './Register.module.css'
import {useState, useEffect} from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const user = {
      displayName ,
      email,
      password
    }

    if(password !== passwordConfirm) {
      setError("A senhas estão diferentes!")
      return
    }

    const res = await createUser(user)

    console.log(res)
  }

  useEffect(()=> {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias...</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name='displayName' 
            required 
            placeholder='Nome do usuário...' 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input 
            type="text" 
            name='email' 
            required 
            placeholder='Email do usuário...' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name='password' 
            required 
            placeholder='Insira sua Senha...' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmação de Senha:</span>
          <input 
            type="password" 
            name='password' 
            required 
            placeholder='Confirme a sua Senha...' 
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        
        {!loading && <button className='btn'>Cadastrar</button> }
        {loading && <button className='btn' disabled>Aguarde ...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register