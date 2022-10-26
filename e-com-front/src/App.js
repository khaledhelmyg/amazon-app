import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
function App() {
  const{state, dispatch: ctxDispatch}=useContext(Store)
  const {cart ,userInfo}=state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position='top-center' limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
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
                {userInfo ? (
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
                ):(
                  <Link className="nav-link" to='/signin'>Sign in </Link>
                )}
              </Nav>
              </Navbar.Collapse>
            </Container>

          </Navbar>

        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/products/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/orderhistory' element={<OrderHistoryScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/' exact element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>all rights are resrved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
