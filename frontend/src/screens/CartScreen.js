import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'

import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'

export default function CartScreen(props) {
  const { id } = useParams(props)
  const productId = id

  let [searchParams, setSearchParams] = useSearchParams(props)
  let qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(
    '🚀 ~ file: CartScreen.js ~ line 7 ~ CartScreen ~ productId',
    productId
  )
  console.log(
    '🚀 ~ file: CartScreen.js ~ line 11 ~ CartScreen ~ qty',
    searchParams.get('qty')
  )

  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id)=> {
    //delete action
    dispatch(removeFromCart(id))
  }

  let navigate = useNavigate()
  const checkOutHandler = () => {
    return navigate('/signin?redirect=shipping')
  }

  return (
    <div className='container-fluid'>
    <Link to='/'>Back to Shopping</Link>
      <div className='row top'>
        <div className='col-2'>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to='/'>Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.product}>
                  <div className='row'>
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='small'
                      ></img>
                    </div>
                    <div className='min-30'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button
                        type='button'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                </h2>
              </li>
              <li>
                <button
                  type='button'
                  onClick={checkOutHandler}
                  className='primary block'
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
