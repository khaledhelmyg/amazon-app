import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import SideBar from '../components/SideBar'
import { Store } from '../Store'
import { getError } from '../utils'

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state,loading:true}
    case "FETCH_SUCCESS":
      return {...state,loading:false,users:action.payload}
    case "FETCH_FAIL":
      return {...state,loading:false,error:action.payload}
    case "DELETE_REQUEST":
      return{...state,loadingDelete:true,successDelete:false}
    case "DELETE_SUCCESS":
      return {...state,loadingDelete:false,successDelete:true}
    case "DELETE_FAIL":
      return{...state,loadingDelete:false}
    case "DELETE_RESET":
      return {...state,loadingDelete:false,successDelete:false}
    default:
      return state
  }

}
export default function UsersListScreen() {
  const [{loading,error,users ,loadingDelete,successDelete},dispatch]=useReducer(reducer,{
    loading:true,
    error:''
  })
  const {state}=useContext(Store)
  const{userInfo}=state

  useEffect(()=>{
    const fetchData= async()=>{
      try{
      dispatch({type:"FETCH_REQUEST"})
      const { data } = await axios.get(`/api/users`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({type:"FETCH_SUCCESS",payload:data})
      }catch (err){
        dispatch({type:"FETCH_FAIL",payload:getError(err)})

      }
    }
    if(successDelete){
      dispatch({type:"DELETE_RESET"})
    }else{
      fetchData()
    }
  },[userInfo,successDelete])
  const deleteHandler=async(user)=>{
    if(window.alert('Are you sure to dlete')){
      try{
        dispatch({type:"DELETE_REQUEST"})
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("User Deleted Successfully")
        dispatch({type:"DELETE_SUCCESS"})
      }catch (err){
        toast.error(err)
        dispatch({type:"DELETE_FAIL"})
      }
    }
  }
  return (
    <Row  className='d-flex  justify-content-center'>
      <Col  md={4} lg={3} xl={2} >
        <SideBar />
      </Col>
      <Col md={8} lg={9} xl={9} className='m-auto'>
      <Helmet><title>Users</title></Helmet>
      <h1>Users</h1>

      {loadingDelete && <LoadingBox />}
      {loading ? (
        <LoadingBox />
      ): error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) :(
        <table className='table'>
          <thead>
          <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "NO"}</td>
                <td>
                <Button 
                    type='button'
                    variant="edit"
                    onClick={()=>Navigate(`/admin/user/${user._id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button 
                    type='button'
                    variant="danger"
                    onClick={()=>deleteHandler(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )  
      }
      </Col>
    </Row>
  )
}
