import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateChat } from '../features/chat'

const ChatPreview = ({username}) => {
  
  const users = useSelector(state => state.user.value.users)
  const user = users.find(usr => usr.username === username)
  const oponentUser = users.filter(usr => usr.username === username)

  const nav = useNavigate()
  const dispatch = useDispatch()

  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const chats = useSelector(state => state.chat.value.chats)
  const userChats = chats.filter(chat => (chat.username === loggedUser.username && chat.username1 === username) || (chat.username1 === loggedUser.username && chat.username === username))
 
  let chatId = ''
  if (userChats) chatId = userChats[0].id
  
  function showChat() {
    nav('/chat/'+chatId)
  }

  function deleteChat() {
    let newArray = [...chats]    
    newArray = newArray.filter(chat => chat.id !== chatId)
    dispatch(updateChat(newArray))
  }

  return (
    <div className='m10 b1'>
      <div className='chatPreview d-flex flex-wrap j-space pointer a-center p5 m10' onClick={showChat}>
        {oponentUser.length ?
        <div className='p5'><img src={user.image} alt="" /></div>
        :
        <div className='p5'><img src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png' alt="" /></div>
        }
        <h3 className='d-flex a-center'>Conversation with {username}</h3>
      </div>
        <div className='d-flex j-center m10'>
          <button onClick={deleteChat}>Delete</button>
        </div>
    </div>
  )
}

export default ChatPreview