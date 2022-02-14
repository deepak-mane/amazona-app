import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { signin } from '../actions/userActions'

export default function SigninScreen(props) {
  // React Hooks
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let [searchParams, setSearchParams] = useSearchParams(props)
  let redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'
  if(redirect === 'shipping'){
    redirect = '/' + redirect
  }
  // console.log(redirect)
  // isntructor's code, is below, above is my alternate code
  // const redirect = props.location.search? props.location.search.split('=')[1]: '/'
  // consoleredirect = '/'
  

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  let navigate = useNavigate()

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))

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
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
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
          <label />
          <button className='primary' type='submit'>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to='/register'>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
