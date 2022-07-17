import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserPreview = ({user}) => {
  
  const nav = useNavigate()
  
  return (
    <div className='userPreview' onClick={() => nav('/user/'+user.username)}>
      <h3>{user.username}</h3>
      <div><img src={user.image} alt="" /></div>
      {user.admin === true ? <div>Administrator</div> : <div>Regular user</div>}      
    </div>
  )
}

export default UserPreview