import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
// import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import {
  Nav,
  NavDropdown,
  Navbar,
  Container,
  ThemeProvider,
  Row,
} from "react-bootstrap";
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <Container fluid>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      >
        <BrowserRouter>
          <Row>
            <Navbar bg="light" className="Navigator" expand="lg" collapseOnSelect fluid>
              <Container className="Navigator">

                <Navbar.Brand href="#home">
                  {" "}
                  <Nav.Link href="/">
                    DGLINKS GEOSPATIAL
                  </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">
                      {" "}
                      Home
                    </Nav.Link>
                    <Nav.Link href="/aboutus">
                      {" "}
                      About Us
                    </Nav.Link>
                    <Nav.Link href="/cart">
                      {" "}
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </Nav.Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">
                          User Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/orderhistory">
                          Order History
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#signout" onClick={signoutHandler}>
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Nav.Link href="/signin">
                        Log In
                      </Nav.Link>
                    )}
                    {userInfo && userInfo.isSeller && (
                      <NavDropdown title="Administrator" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/productlist/seller">
                          Products
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/orderlist/seller">
                          Orders
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/dashboard">
                          Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/productlist">
                          Products
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/orderlist">
                          {" "}
                          Orders
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/userlist">
                          Users
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Row>
          <Row>
            <Routes>
              <Route path="/seller/:id" element={<SellerScreen />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/cart/:id" element={<CartScreen />}></Route>
              <Route
                path="/product/:id"
                element={<ProductScreen />}
                exact
              ></Route>
              <Route
                path="/product/:id/edit"
                element={<ProductEditScreen />}
                exact
              ></Route>
              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/register" element={<RegisterScreen />}></Route>
              <Route path="/aboutus" element={<AboutUsScreen />}></Route>
              <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
              <Route path="/order/:id" element={<OrderScreen />}></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path="/search/name" element={<SearchScreen />} exact></Route>
              <Route
                path="/search/name/:name"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/category/:category"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/category/:category/name/:name"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                element={<SearchScreen />}
                exact
              ></Route>

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileScreen />
                  </PrivateRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <PrivateRoute>
                    <MapScreen />
                  </PrivateRoute>
                }
              />

              <Route
                path="/productlist"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/productlist/pageNumber/:pageNumber"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/orderlist"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/userlist"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/user/:id/edit"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <AdminRoute>
                    <SupportScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/productlist/seller"
                element={
                  <SellerRoute>
                    <ProductListScreen />
                  </SellerRoute>
                }
              />
              <Route
                path="/orderlist/seller"
                element={
                  <SellerRoute>
                    <OrderListScreen />
                  </SellerRoute>
                }
              />

              <Route path="/" element={<HomeScreen />} exact></Route>
            </Routes>
          </Row>
          <footer>
          <Row className="row center">
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
            <div>All right reserved dglinks 2021<br />
              <div className='row center'>
                <Link to="/">
                  <i className="fa fa-facebook" />
                </Link>
                <Link to="/">
                  <i className="fa fa-twitter" />
                </Link>
                <Link to="/">
                  <i className="fa fa-google" />
                </Link>
              </div></div>
            {' '}
          </Row>
          </footer>
        </BrowserRouter>
      </ThemeProvider>
    </Container>

  );
}

export default App;
