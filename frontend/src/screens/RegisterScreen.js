import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { register } from '../actions/userActions'

export default function RegisterScreen(props) {
  // React Hooks
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  let [searchParams, setSearchParams] = useSearchParams(props)
  let redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'
  if(redirect === 'shipping'){
    redirect = '/' + redirect
  }
  // console.log(redirect)
  // isntructor's code, is below, above is my alternate code
  // const redirect = props.location.search? props.location.search.split('=')[1]: '/'
  // consoleredirect = '/'
  

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  let navigate = useNavigate()

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      alert('Password and confirm password do not match')
    } else {
      dispatch(register(name, email, password))
    }
    

  }

  useEffect(() => {
    if (userInfo) {
     
      return navigate(redirect)
    }
  }, [userInfo, redirect, userInfo])

  return (
    <div className='container-fluid'>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Enter name'
            required
            onChange={e => setName(e.target.value)}
          ></input>
        </div>        
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            required
            onChange={e => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            required
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Password</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm password'
            required
            onChange={e => setConfirmPassword(e.target.value)}
          ></input>
        </div>        
        <div>
          <label />
          <button className='primary' type='submit'>
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
