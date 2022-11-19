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
import Container from 'react-bootstrap/esm/Container'
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
    <>
    <Row className='w-100 m-0 p-0 row-md-pull-1 ' >
      <img src='https://m.media-amazon.com/images/I/71aQ3u78A3L._SX3000_.jpg'
        alt="balck firyday"
      />
    </Row>
      <Container className='row-md-push-2' md={8}>
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
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3 ml-0">
            <Product product={product} />
            </Col>
           ))}
           </Row> 
           )}
           </div>
       </Container>
       </>
    )
}
export default HomeScreen