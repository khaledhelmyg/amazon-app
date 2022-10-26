// import data from "../data"
import axios from 'axios'
import { useEffect, useReducer } from "react"
import logger from 'use-reducer-logger'
import Product from '../components/Product'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state,loading:true}
    case "FETCH_SUCCESS":
      return {...state,products:action.payload,loading:false}
    case "FETCH_FAIL":
      return {...state,loading:false,error:action.payload}
    default:
      return state
  }
}
function HomeScreen (){
  // const [products,setProducts]=useState([])
  const[{error,loading,products},dispatch]=useReducer(logger(reducer),
  {products:[],
  error:'',
  loading:true
})
  useEffect(()=>{
    const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST"})
      try{
        const resault=await axios.get('/api/products')
        dispatch({type:"FETCH_SUCCESS",payload:resault.data})
      }catch(err){
        dispatch({type:"FETCH_FAIL",payload:err.message})
      }
      
      // setProducts(resault.data)
    }
    fetchData()
  },[])
    return(
        <div>
          <Helmet>
            <title>Amazon</title>
          </Helmet>
        <h1>Fuatured Products</h1>
        <div className='products'>

        { loading ? (
        <LoadingBox />
        )
        : error?(
        <MessageBox variant="danger">{error}</MessageBox>
        )
        :(
          <Row >
            { products.map(product=>(
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product} />
            </Col>
  
           ))}
           </Row> 
           
           )}
           </div>
       </div>
    )
}
export default HomeScreen