import React from 'react'
import { useSelector } from 'react-redux'
import UserPreview from '../components/UserPreview'

const AllUsersPage = () => {
 
  const loggedUser = useSelector(state => state.user.value.userLoggedIn)
  const users = useSelector(state => state.user.value.users)
  const users1 = users.filter(usr => usr.username !== loggedUser.username)
  
  return (
    <div className='p5 m10 b1'>
      <h1>All users</h1>
      <div className='wrapper'>{users1.map(usr => <UserPreview key={usr.username} user={usr}/>)}</div>
    </div>
  )
}

export default AllUsersPage