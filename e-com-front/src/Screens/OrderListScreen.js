import React, { useContext, useEffect, useReducer } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import SideBar from '../components/SideBar';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, orders: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'DELETE_REQUEST':
         return { ...state, loadingDelete: true, successDelete: false };
      case 'DELETE_SUCCESS':
        return {
            ...state,
            loadingDelete: false,
            successDelete: true,
        };
      case 'DELETE_FAIL':
        return { ...state, loadingDelete: false };
      case 'DELETE_RESET':
        return { ...state, loadingDelete: false, successDelete: false };
      default:
        return state;
    }
  };

export default function OrderListScreen() {
    const {state}=useContext(Store)
    const {userInfo}=state
    const navigate=useNavigate()
    const [{ loading, error, orders,loadingDelete,successDelete }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
      });
    useEffect(()=>{
        const fetchOrdersList=async()=>{
            dispatch({type:'FETCH_REQUEST'})
            try{
                const {data}=await axios.get('/api/orders', {
                     headers: { Authorization: `Bearer ${userInfo.token}` 
                    } 
            })
            dispatch({type:"FETCH_SUCCESS" ,payload: data})
            }catch (err){
                dispatch({type:"FETCH_FAIL",payload:getError(err)})
            }
        }
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
          } else {
            fetchOrdersList()
        }
    },[userInfo,successDelete])
    const deleteHandler =async(order)=>{
        if(window.confirm('Are YOU Sure to delete?')){
            try{
                dispatch({type:"DELETE_REQUEST"})
                await axios.delete(`/api/orders/${order._id}`,{
                    headers :{Authorization : `Bearer ${userInfo.token}`}
                })
                toast.success('Order deleted successfully')
                dispatch({type:"DELETE_SUCCESS"})
            }catch (err){
                toast.error(getError(err))
                dispatch({type:"DELETE_FAIL"})
            }
        }
    }
  return (
    <Row className='d-flex justify-content-between flex-wrap'>
      <Col  md={2} >
        <SideBar />
      </Col>
      <Col  md={9} >
      <div className='px-2'>
      <Helmet><title>Order List Screen</title></Helmet>
      <h1 className='my-3'>Order List Screen</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (<LoadingBox /> ) :
       error ? (<MessageBox variant="danger">{error}</MessageBox>)  
      : (
        <table className='table ' >
        <thead>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELEVIRED</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(order =>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0,10) : "NO"}</td>
                    <td>
                     {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                    </td>
                    <td>
                        <Row>
                            <Col>
                             <Button
                                type="button"
                                variant="light"
                                onClick={() => {
                                navigate(`/order/${order._id}`);
                                }}
                            >
                                Details
                              </Button>
                            </Col>
                            <Col>
                              <Button type="button" variant="danger" className="small" 
                              onClick={()=>deleteHandler(order)}
                              >
                                Delete
                              </Button>
                            </Col>
                        </Row>
                    </td>
                </tr>
            ))
            
            
            }
        </tbody>
      </table>
      )
    }
     
    </div>
    </Col>
    </Row>
  )
}
