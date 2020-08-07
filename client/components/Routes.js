import React from 'react'
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom'
import {Home, AllProducts} from './index'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <div id="title">Rat Shopper!</div>
          <div id="navLinks">
            <div className="navLink">
              <Link to="/">Home</Link>
            </div>
            <div className="navLink">
              <Link to="/products">Products</Link>
            </div>
          </div>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/products" component={AllProducts} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default Routes
