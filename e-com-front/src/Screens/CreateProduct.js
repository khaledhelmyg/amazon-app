import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import { Store } from '../Store';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import LoadingBox from '../components/LoadingBox';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams } from 'react-router-dom';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function CreateProduct() {
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const [name,setName] = useState('')
//   const [category,setCategory]=useState('')
//   const [price,setPrice]=useState('')
//   const [prand,setPrand]=useState('')
//   const [count,setCount]=useState('')
//   const [description,setDescription]=useState('')
//   const submitHandler =(e) =>{
//     e.preventDefault()
//   } 
 
const navigate = useNavigate();
const params = useParams(); // /product/:id
const { id: productId } = params;

const { state } = useContext(Store);
const { userInfo } = state;
const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });

const [name, setName] = useState('');
const [slug, setSlug] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
const [images, setImages] = useState([]);
const [category, setCategory] = useState('');
const [countInStock, setCountInStock] = useState('');
const [brand, setBrand] = useState('');
const [description, setDescription] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      // const { data } = await axios.get(`/api/products`);
      // setName(data.name);
      // setSlug(data.slug);
      // setPrice(data.price);
      // setImage(data.image);
      // setImages(data.images);
      // setCategory(data.category);
      // setCountInStock(data.countInStock);
      // setBrand(data.brand);
      // setDescription(data.description);
      dispatch({ type: 'FETCH_SUCCESS' });
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(err),
      });
    }
  };
  fetchData();
}, [productId]);

const submitHandler = async (e) => {
  e.preventDefault();
  try {
    dispatch({ type: 'UPDATE_REQUEST' });
    await axios.post(
      `/api/products`,
      {
        _id: productId,
        name,
        slug,
        price,
        image,
        images,
        category,
        brand,
        countInStock,
        description,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: 'CREATE_SUCCESS',
    });
    toast.success('Product Created successfully');
    navigate('/');
  } catch (err) {
    toast.error(getError(err));
    dispatch({ type: 'UPDATE_FAIL' });
  }
};
const uploadFileHandler = async (e, forImages) => {
  const file = e.target.files[0];
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  try {
    dispatch({ type: 'UPLOAD_REQUEST' });
    const { data } = await axios.post('/api/upload', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: 'UPLOAD_SUCCESS' });

    if (forImages) {
      setImages([...images, data.secure_url]);
    } else {
      setImage(data.secure_url);
    }
    toast.success('Image uploaded successfully. click Update to apply it');
  } catch (err) {
    toast.error(getError(err));
    dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
  }
};
const deleteFileHandler = async (fileName, f) => {
  console.log(fileName, f);
  console.log(images);
  console.log(images.filter((x) => x !== fileName));
  setImages(images.filter((x) => x !== fileName));
  toast.success('Image removed successfully. click Update to apply it');
};
  return (
    
    <Container className="small-container my-3">
      <Helmet>
        <title>New Product ${`${productId}`}</title>
      </Helmet>
      <h1>New Product {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="additionalImage">
            <Form.Label>Additional Images</Form.Label>
            {images.length === 0 && <MessageBox>No image</MessageBox>}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroup.Item key={x}>
                  {x}
                  <Button variant="light" onClick={() => deleteFileHandler(x)}>
                    <i className="fa fa-times-circle"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalImageFile">
            <Form.Label>Upload Aditional Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => uploadFileHandler(e, true)}
            />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              required
            />
  
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Add Product
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
  // return (
  //   <Container className='small-container'>
  //     <Helmet><title>Create product</title></Helmet>
  //     <h1 className='my-3'>Create product</h1>
  //     <Form onSubmit={submitHandler}>
  //       <Form.Group className='mb-3' controlId='productName'>
  //           <Form.Label>Product Name</Form.Label>
  //           <Form.Control required onChange={(e)=> setName(e.target.value)}></Form.Control>
  //       </Form.Group>
  //       <Form.Group className='mb-3' controlId='price'>
  //           <Form.Label>Product Price</Form.Label>
  //           <Form.Control required onChange={(e)=> setPrice(e.target.value)}></Form.Control>
  //       </Form.Group>
  //       <Form.Group className='mb-3' controlId='description'>
  //           <Form.Label>Description</Form.Label>
  //           <Form.Control 
  //           as="textarea"
  //           placeholder="Leave a comment here"
  //           style={{ height: '100px' }}
  //           required onChange={(e)=> setDescription(e.target.value)}></Form.Control>
  //       </Form.Group>
  //       <Form.Group className='mb-3' controlId='category'>
  //           <Form.Label>Category</Form.Label>
  //           <Form.Control required onChange={(e)=> setCategory(e.target.value)}></Form.Control>
  //       </Form.Group>
        
  //       <Form.Group className='mb-3' controlId='count'>
  //           <Form.Label>Product Count</Form.Label>
  //           <Form.Control required onChange={(e)=> setCount(e.target.value)}></Form.Control>
  //       </Form.Group>
  //       <Form.Group className='mb-3' controlId='prand'>
  //           <Form.Label>Prand</Form.Label>
  //           <Form.Control required onChange={(e)=> setPrand(e.target.value)}></Form.Control>
  //       </Form.Group>
    
  //       <div className='mb-3'>
  //           <Button>Add Product</Button>
  //       </div>
  //     </Form>
  //   </Container>
  // )
}

export default CreateProduct
