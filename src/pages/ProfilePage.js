import React from 'react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../features/user'

const ProfilePage = () => {

  const user = useSelector(state => state.user.value.userLoggedIn)
  const usersObj = useSelector(state => state.user.value)

  const [getError, setError] = useState('')

  const pictureRef = useRef()
  const passwordRef = useRef()
  
  const dispatch = useDispatch()

  function updateProfileData(obj) {
    const userIndex = usersObj.users.findIndex(usr => usr.username === user.username)
    dispatch(updateUser({index: userIndex, newData: obj}))    
  }

  function changeProfilePicture() {
    if (!pictureRef.current.value) return setError('Image url required!')
    const newPicture = pictureRef.current.value
    let userUpdated = {...usersObj.userLoggedIn}
    userUpdated.image = newPicture
    updateProfileData(userUpdated)
    pictureRef.current.value = ''
  }

  function changeProfilePassword() {
    let error = false
    const newPassword = passwordRef.current.value

    error = validatePassword(newPassword)
    if (error) return setError(error)
    setError(null)
      
    let userUpdated = {...usersObj.userLoggedIn}
    userUpdated.password = newPassword
    updateProfileData(userUpdated)
    passwordRef.current.value = ''
  }

  function validatePassword(password) {
    let result = false
    const regex = /^(?=.*[!@#$%^&*_+])(?=.*[a-z])(?=.*[A-Z]).{4,20}$/

    // /^               : Start
    // (?=.{8,})        : Length
    // (?=.*[a-zA-Z])   : Letters
    // (?=.*\d)         : Digits
    // (?=.*[!#$%&? "]) : Special characters
    // $/               : End

    if (password.length < 4) {
      result = 'Password should be 4 chars length minimum!'
    } else if (password.length > 20) {
        result = 'Password should be 20 chars length maximum!'
    } else if (!regex.test(password)) {
        result = 'Uppercase letter should be included, special symbol (!@#$%^&*_+) should be included in password!'
    }
    return result
  }

  return (
    <div className='profile b1 p5 m10'>
      <h1>Hello, {user.username}!</h1>
      {user.admin === true ? <div className='p5 m10'>You are administrator</div> : <div className='p5 m10'>You are regular user</div>}
      <div><img className='b1' src={user.image} alt="" /></div>
      {getError && <div className='red'>Error: {getError}</div>}
      <div>
        <input className='m10' type="text" placeholder='paste image url' ref={pictureRef} defaultValue='https://avatars.githubusercontent.com/u/100585186?v=4'/>
        <button onClick={changeProfilePicture}>Change profile photo</button>
      </div>
      <div className='p5 m10'>Your password is: {user.password}</div>
      <div>
        <input className='m10' type="text" placeholder='new password' ref={passwordRef}/>
        <button onClick={changeProfilePassword}>Change password</button>
      </div>
    </div>
  )
}

export default ProfilePage