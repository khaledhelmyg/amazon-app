import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'

export default function PaymentScreen() {
    const navigate=useNavigate()
    const {state,dispatch: ctxDispatch}=useContext(Store)
    const {cart:{shippingAddress,paymentMethod},}=state
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
      );
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
    const handelSubmit=async(e)=>{
        e.preventDefault()
        ctxDispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethodName})
        localStorage.setItem('paymentMethod',paymentMethodName)
        navigate('/placeorder')
    }
  return (
    <div className='m-3'>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Helmet>
        <title>Payment screnn</title>
      </Helmet>
      <h1 className='my-3'>Payment Screen</h1>
      <Form onSubmit={handelSubmit}>
        <div className='mb-3'>
          <Form.Check
           type="radio"
           id="PayPal"
           label="PayPal"
           value="PayPal"
           checked={paymentMethodName === 'PayPal'}
           onChange={(e) => setPaymentMethod(e.target.value)}
            />
        </div>
        <div className='mb-3'>
          <Form.Check
           type="radio"
           id="Stripe"
           label="Stripe"
           value="Stripe"
           checked={paymentMethodName === 'Stripe'}
           onChange={(e) => setPaymentMethod(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <Button type="submit">Continue</Button>
        </div>
      </Form>
    </div>
  )
}
