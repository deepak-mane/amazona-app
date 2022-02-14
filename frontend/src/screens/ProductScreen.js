import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'

export default function ProductScreen(props) {
  const dispatch = useDispatch()
  const { id } = useParams(props)
  // console.log(id)
  const productId = id
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(detailsProduct(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    console.log("🚀 ~ file: ProductScreen.js ~ line 29 ~ addToCartHandler ~ productId", productId)    
    console.log("🚀 ~ file: ProductScreen.js ~ line 29 ~ addToCartHandler ~ qty", qty)    
    return navigate(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='container-fluid'>
          <Link to='/'>Back to result</Link>
          <div className='row top'>
            <div className='col-2'>
              <img className='large' src={product.image} alt={product.name} />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    key={product.rating}
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>

                <li>Price: ${product.price}</li>
                <li>Description: {product.description}</li>
              </ul>
            </div>
            <div className='col-1'></div>
            <div className='card card-body'>
              <ul>
                <li>
                  <div className='row'>
                    <div>Price</div>
                    <div className='price'>${product.price}</div>
                  </div>
                </li>

                <li>
                  <div className='row'>
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className='success'>In Stock</span>
                      ) : (
                        <span className='error danger'>Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className='row'>
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={addToCartHandler}
                        className='primary block'
                      >
                        Add to Cart
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
