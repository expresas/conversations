import {useParams} from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/user'
import { createChat } from '../features/chat'

const ChatsPage = () => {
  
  const {chatId} = useParams()

  const textareaRef = useRef()

  const [getError, setError] = useState(null)
  // const [getBlock, setBlock] = useState(null)
  
  const dispatch = useDispatch()
    
  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const chats = useSelector(state => state.chat.value.chats)
  const usersObj = useSelector(state => state.user.value)

  const currentChat = chats.filter(chat => chat.id === Number(chatId))

  let username = ''
  if (currentChat) {
    currentChat[0].username === loggedUser.username ? username = currentChat[0].username1 : username = currentChat[0].username
  }

  const oponentUser = usersObj.users.filter(usr => usr.username === username)

  function sendMessage() {    
    if (!oponentUser[0].banned.includes(loggedUser.username)) {
      if (!loggedUser.banned.includes(username)) {
        const newMessage = textareaRef.current.value
        if (!newMessage) return setError(`Write something, you can't send empty messages!`)
        textareaRef.current.value = ''
    
        const obj = {
          id: Number(chatId), 
          username: loggedUser.username, 
          username1: username, 
          message: newMessage, 
          timestamp: new Date().toLocaleString()
        }

        dispatch(createChat(obj))
        setError('Message sent!')
      } else {
        setError(`You blocked ${username}. You can't send messages!`)
      }
    } else {
      setError(`You are blocked by ${username}. You can't send messages!`)
    }    
  }

  function manageUserBlock() {
    if (!loggedUser.banned.includes(username)) {
      // block
      let userUpdated = {...usersObj.userLoggedIn}
      let bansUpdated = [...userUpdated.banned]
      bansUpdated.push(username)
      userUpdated.banned = bansUpdated
      updateProfileData(userUpdated)
      setError(`You blocked ${username}. You can not send messages!`)
    } else {
      // unblock      
      let userUpdated = {...usersObj.userLoggedIn}
      let bansUpdated = [...userUpdated.banned]
      bansUpdated = bansUpdated.filter(bannedUser => bannedUser !== username)
      userUpdated.banned = bansUpdated
      updateProfileData(userUpdated)
      setError(`You unblocked ${username}. Now you can send messages!`)
    }
  }

  function updateProfileData(obj) {
    const userIndex = usersObj.users.findIndex(usr => usr.username === loggedUser.username)
    dispatch(updateUser({index: userIndex, newData: obj}))    
  }

  return (
    <div className='m10 p5 b1'>
      {currentChat && oponentUser.length ?
      <h1>Conversation with {username} <span><button onClick={manageUserBlock}>{!loggedUser.banned.includes(username) ? 'Block user' : 'Unblock user'}</button></span></h1>
      :
      <div>
        <h1>Conversation with {username}</h1>
        <div>This user was deleted!</div>
        <div>You can't sent messages!</div>
      </div>    
      }
      {currentChat && currentChat.map((chat, index) => 
      <div key={index} className='message p5 m10'>
        <div>{chat.username}: {chat.message}</div>
        <div className='small'>Date: {chat.timestamp}</div>
      </div>
      )}
      {getError && <div className='red'>{getError}</div>}     
      {oponentUser.length ?
      <div>
        <div className='m10'>
          <textarea cols="60" rows="5" ref={textareaRef} defaultValue='Write something...'></textarea>
        </div>
        <div className='m10'>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
      :
      ''
      } 
    </div>
  )
}

export default ChatsPage