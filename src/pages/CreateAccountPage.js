import React from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../features/user'

const CreateAccountPage = () => {

  const users = useSelector(state => state.user.value.users)

  const [getError, setError] = useState(null)

  const usernameRef = useRef()
  const pass1Ref = useRef()
  const pass2Ref = useRef()
  const adminRef = useRef()

  const nav = useNavigate()
  const dispat = useDispatch()

  function validateUsername(username) {
    let result = false
    if (username.length < 4) result = 'Username should be 4 chars length minimum!'
    if (username.length > 20) result = 'Username should be 20 chars length maximum!'
    return result
  }

  function validatePassword(password1, password2) {
    let result = false
    const regex = /^(?=.*[!@#$%^&*_+])(?=.*[a-z])(?=.*[A-Z]).{4,}$/

    // /^               : Start
    // (?=.{8,})        : Length
    // (?=.*[a-zA-Z])   : Letters
    // (?=.*\d)         : Digits
    // (?=.*[!#$%&? "]) : Special characters
    // $/               : End

    if (password1.length < 4) {
      result = 'Password should be 4 chars length minimum!'
    } else if (password1.length > 20) {
        result = 'Password should be 20 chars length maximum!'
    } else if (!regex.test(password1)) {
        result = 'Uppercase letter should be included, special symbol (!@#$%^&*_+) should be included in password!'
    } else if (password1 !== password2) result = "Passwords should match!"
    
    return result
  }

  function checkUsername(nick) {
    let result = false
    const userExist = users.find(user => user.username === nick)
    if (userExist) result = `User with username '${nick}' already exist. Please log in!`
    return result    
  }

  function createAccount() {
    let error = false

    const user = {
      admin: adminRef.current.checked, 
      username: usernameRef.current.value,
      password: pass1Ref.current.value, 
      image: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
      chats: [],
      banned: [],
      deleted: false,
    }
    
    if (validateUsername(user.username)) {
      error = validateUsername(user.username)
    } else if (validatePassword(user.password, pass2Ref.current.value)) {
        error = validatePassword(user.password, pass2Ref.current.value)
    } else if (checkUsername(user.username)) {
        error = checkUsername(user.username)
    }
  
    if (error) return setError(error)

    setError(null)

    dispat(createUser(user))
    nav('/login')  }

    return (
    <div className='m10 p5 b1'>
      <h1>Create account</h1>
      <div>Username</div>
      <input ref={usernameRef} defaultValue='Dainius'/>
      <div>Password</div>
      <input ref={pass1Ref} defaultValue='sddsU_2'/>
      <div>Repeat password</div>
      <input ref={pass2Ref} defaultValue='sddsU_2'/>
      <div>Check here <input ref={adminRef} type="checkbox" name="" id="" /> if user will be admin </div>
      <div className='m10'>
        <button onClick={createAccount}>Create account</button>
      </div>
      {getError && <div className='m10'>Error: {getError}</div>}
    </div>
  )
}

export default CreateAccountPage