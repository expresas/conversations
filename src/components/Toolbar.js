import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../features/user'

const Toolbar = () => {

  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const chats = useSelector(state => state.chat.value.chats)
  const [getCounter, setCounter] = useState(0)

  const dispatch = useDispatch()
  const nav = useNavigate()

  function logOutUser() {
    dispatch(setLoggedUser(''))
    nav('/login')
  }

  useEffect(() => {
    // logics without stackoverflow :)
    let myChats = chats.filter(chat => (chat.username === loggedUser.username) || (chat.username1 === loggedUser.username))
    const chatIds = []
    for (let i = 0; i < myChats.length; i++) {
      chatIds.push(myChats[i].id)
    }
    myChats = [...new Set(chatIds)]
    setCounter(myChats.length)
  }, [getCounter, chats, loggedUser])
  
  return (
    <div>
      {loggedUser 
      ? 
      <div className='toolbar'>
        <Link to={'/'}>Conversations ({getCounter})</Link>
        <Link to={'/users'}>All users</Link>
        <Link to={'/profile'}>{loggedUser.username}'s profile {loggedUser.admin ? '(admin)' : '(regular)'}</Link>
        <button onClick={logOutUser}>Logout</button>
      </div>
      :
      <div className='toolbar'>
        <Link to={'/create-account'}>Create account</Link>
        <Link to={'/login'}>Login</Link>
      </div>
      }
    </div>
  )
}

export default Toolbar