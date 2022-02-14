import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'
import { signout } from './actions/userActions'

function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()
  const signoutHandler = (e) => {
    e.preventDefault()
    dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              amazona
            </Link>
          </div>
          <div>
            <Link to='/cart'>
              Cart
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>
                  {userInfo.name}
                  <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id/' element={<CartScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/' element={<HomeScreen />} exact={true} />
          </Routes>
        </main>
        <footer className='row center'>All rights reserved.</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
