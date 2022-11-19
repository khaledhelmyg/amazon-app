import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store';
import { useContext, useEffect, useState } from 'react';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import Footer from './components/Footer'
import Button from 'react-bootstrap/esm/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './Screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './Screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './Screens/OrderListScreen';
import CreateProduct from './Screens/CreateProduct';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import SideBar from './components/SideBar';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import UsersListScreen from './Screens/UsersListScreen';


function App() {
  const{state, dispatch: ctxDispatch}=useContext(Store)
  const {cart ,userInfo}=state
  const signoutHandler=()=>{
    ctxDispatch({type:"USER_SIGNOUT"})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href('/signin')

  }
 
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
     <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position='top-center' limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
            <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to='/'>
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <SearchBox />
            <Nav className='me-auto w-100 justify-content-end' >
                <Link to="/cart" className='nav-link'>
                  Cart
                  {
                    cart.cartItems.length> 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a,c)=>a + c.quantity,0)}
                      </Badge>
                    )
                  }
                </Link>
                 {userInfo && !userInfo.isAdmin && (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <Link 
                      className="dropdown-item"
                      to="/#signout"
                      onClick={signoutHandler}>
                        Sign Out
                    </Link>
                  </NavDropdown>
                )}
                {!userInfo&&(
                  <Link className="nav-link" to='/signin'>Sign in </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='admin' id='admin-nav-dropdown'>
                    <LinkContainer to='/admin/dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <Link 
                      className="dropdown-item"
                      to="/#signout"
                      onClick={signoutHandler}>
                        Sign Out
                    </Link>
                  </NavDropdown>
                )}
              </Nav>
              </Navbar.Collapse>
            </Container>

          </Navbar>

        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column h-100'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 h-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                  <Nav.Link  onClick={() => setSidebarIsOpen(false)} as={Link} to={`/search?category=${category}`}>{category}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
        {/* className={path ==='/admin/dashboard' ?'m-0 p-0': ''}  */}
                  <Routes >
                      <Route path='/products/:slug' element={<ProductScreen />} />
                      <Route path='/cart' element={<CartScreen />} />
                      <Route path='/search' element={<SearchScreen />} />
                      <Route path='/signin' element={<SigninScreen />} />
                      <Route path='/signup' element={<SignupScreen />} />
                      <Route path='/profile' element={ 
                        <ProtectedRoute>
                          <ProfileScreen />
                      </ProtectedRoute>
                      } />
                      <Route path='/placeorder' element={<PlaceOrderScreen />} />
                      <Route path='/order/:id' element={
                      <ProtectedRoute>
                          <OrderScreen />
                      </ProtectedRoute>
                      } />
                      <Route path='/orderhistory' element={
                      <ProtectedRoute>
                          <OrderHistoryScreen />
                      </ProtectedRoute>
                      } />
                      <Route path='/shipping' element={<ShippingAddressScreen />} />
                      <Route path='/payment' element={<PaymentScreen />} />
                      {/*addmin routes */}
                      <Route path='/admin/dashboard' element={
                      <AdminRoute>
                        <DashboardScreen />
                      </AdminRoute>} />
                      <Route path='/admin/orders' element={
                      <AdminRoute>
                        < OrderListScreen />
                      </AdminRoute>
                    } />
                    <Route path='/admin/products' element={
                      <AdminRoute>
                        < ProductListScreen />
                      </AdminRoute>
                    } />
                    <Route path='/admin/product/new' element={
                      <AdminRoute>
                        <CreateProduct />
                      </AdminRoute>
                    } />          
                    <Route path='/product/:id' element={
                      <AdminRoute>
                        < ProductEditScreen />
                      </AdminRoute>
                    } />
                     <Route path='/admin/users' element={
                      <AdminRoute>
                        < UsersListScreen />
                      </AdminRoute>
                    } />
                    <Route path='/' exact element={<HomeScreen />} />
                  </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
