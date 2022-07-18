import React from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../features/user'

export const LoginPage = () => {

  const usernameRef = useRef()
  const passRef = useRef()

  const [getError, setError] = useState('')

  const users = useSelector(state => state.user.value.users)

  const dispat = useDispatch()

  const nav = useNavigate()

  function validateUser(nick, pass) {
    let result = false
    const userExist = users.find(user => user.username === nick)
    if (!userExist) result = `No such user in our database!`
    if (userExist && userExist.password !== pass) result = 'Wrong password!'
    return result
  }

  function loginToAccount() {
    let error = false

    const nick = usernameRef.current.value
    const pass = passRef.current.value
    error = validateUser(nick, pass)
    if (error) return setError(error)

    setError(null)

    const userExist = users.find(user => user.username === nick)
    dispat(setLoggedUser(userExist))
    nav('/profile')
  }

  return (
    <div className='m10 p5 b1'>
      <h1>Log in to your account</h1>
      <div>Username</div>
      <input type="text" ref={usernameRef} defaultValue='Dainius'/>
      <div>Password</div>
      <input type="text" ref={passRef} defaultValue='sddsU_2'/>
      <div className='m10'>
        <button onClick={loginToAccount}>Login</button>
      </div>
      {getError && <div className='m10 red'>Error: {getError}</div>}
    </div>
  )
}