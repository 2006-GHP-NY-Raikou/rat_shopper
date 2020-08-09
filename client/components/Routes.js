// import React from 'react'
// import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom'
// import {Home, AllProducts, SingleUser, UpdateCartSingleProduct, NewProduct, UpdateProduct, RemoveProduct, Login, Signup} from './index'
// import {getOrCreateOrder} from '../store/order'
// import {connect} from 'react-redux'

// class Routes extends React.Component {
//   componentDidMount() {
//     this.props.getOrCreateOrder()
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <nav>
//             <div id="title">Rat Shopper!</div>
//             <div id="navLinks">
//               <div className="navLink">
//                 <Link to="/">Home</Link>
//               </div>
//               <div className="navLink">
//                 <Link to="/products">Products</Link>
//               </div>
//               <div>
//                 <Link to="" />
//               </div>
//             </div>
//           </nav>
//           <main>
//             <Switch>
//   <Route exact path="/" component={Home} />
//   <Route exact path="/login" component={Login} />
//   <Route exact path="/signUp" component={Signup} />
//   <Route exact path="/auth/me" component={SingleUser} />
//   <Route exact path="/products" component={AllProducts} />
//   <Route exact path="/cart/update/productId" component={UpdateCartSingleProduct}/>
//   <Route exact path ="/admin/NewProduct" component={NewProduct}/>
//   <Route exact path="/admin/UpdateProduct" component={UpdateProduct}/>
//   <Route exact path="/admin/RemoveProduct" component={RemoveProduct}/>
//             </Switch>
//           </main>
//         </div>
//       </Router>
//     )
//   }
// }

// const mapState = state => ({
//   orderId: state.orderId
// })

// const mapDispatch = dispatch => ({
//   getOrCreateOrder: () => dispatch(getOrCreateOrder())
// })

// export default connect(mapState, mapDispatch)(Routes)
