import React from 'react'
import { useSelector } from 'react-redux'
import ChatPreview from '../components/ChatPreview'

const IndexPage = () => {
  
  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const chats = useSelector(state => state.chat.value.chats)

  let userChats = chats.filter(chat => chat.username === loggedUser.username || chat.username1 === loggedUser.username)
  let newArray = [] 
  for (let i = 0; i < userChats.length; i++) {
    if (loggedUser.username !== userChats[i].username) {
      newArray.push(userChats[i].username)
    } else if (loggedUser.username !== userChats[i].username1) {
      newArray.push(userChats[i].username1)
    }
  }
  userChats = [...new Set(newArray)]

  return (
    <div className='m10 p5 b1'>
      {!loggedUser && 
      <div>
        <h1>Hello, how are you today?</h1>
        <div className='m10'><a href="https://www.linkedin.com/in/dainius-raizys/" target='_blank' rel="noreferrer">2022 © Dainius Raižys</a></div>
      </div>
      }      

      {loggedUser && userChats && <h1>Conversations</h1>}      
      {loggedUser && userChats && userChats.map((chat, index) => <ChatPreview key={index} username={chat}/>)}
    </div>
  )
}

export default IndexPage