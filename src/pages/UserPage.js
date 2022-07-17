import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../features/user'
import { useNavigate } from 'react-router-dom'
import { createChat } from '../features/chat'

const UserPage = () => {
  
  const { username } = useParams()
  const users = useSelector(state => state.user.value.users)
  const user = users.find(usr => usr.username === username)
  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const chats = useSelector(state => state.chat.value.chats)

  const [getError, setError] = useState('')
  const textareaRef = useRef()

  const dispatch = useDispatch()
  const nav = useNavigate()

  function deleteThisUser() {
    const userIndex = users.findIndex(usr => usr.username === username)
    dispatch(deleteUser(userIndex))
    nav('/users')
  }

  function sendMessage() {
    const newMessage = textareaRef.current.value

    if (user.banned.includes(loggedUser.username)) return setError(`${username} banned you... you can't send messages!`)
    if (loggedUser.banned.includes(username)) return setError(`You banned ${username}... you can't send messages!`)
    if (!newMessage) return setError(`Enter some text. You can't send empty messages!`)

    const chatExist = chats.find(chat => (chat.username === loggedUser.username && chat.username1 === username) || (chat.username1 === loggedUser.username && chat.username === username))
    let tempId = ''
    if (chatExist) {
      tempId = chatExist.id
      const obj = {id: tempId, username: loggedUser.username, username1: username, message: newMessage, timestamp: new Date().toLocaleString()}
      dispatch(createChat(obj))
    } else {
      const obj = {id: Date.now(), username: loggedUser.username, username1: username, message: newMessage, timestamp: new Date().toLocaleString()}
      dispatch(createChat(obj))
    }
    setError('Message sent!')
    textareaRef.current.value = ''
  }

  return (
    <div className='m10 b1'>
      <h1>That's {username} profile</h1>
      <div className='wrapper'>
        <div className='userpageProfile p5 b1 m10'>
          <h3>{username}</h3>
          <div>
            <img src={user.image} alt="" />
          </div>
          {user.admin === true ? <div>Administrator</div> : <div>Regular user</div>}
          {loggedUser.admin && loggedUser.username !== username && <div className='m10'><button onClick={deleteThisUser}>Delete this user</button></div>}
        </div>
        {loggedUser.username !== username &&
        <div className='m10'>
          <div>
            <textarea cols="60" rows="10" ref={textareaRef} defaultValue='Write something...'></textarea>
          </div>
          {getError && <div className='red'>{getError}</div>}        
          <div>
            <button onClick={sendMessage}>Send message</button>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default UserPage