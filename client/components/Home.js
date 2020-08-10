import React from 'react'
import AllProducts from './AllProducts'

export default function Home() {
  return (
    <div id="homePage">
      <div id="welcome">
        <h3>
          Welcome to the definitive hub for adopting rats and shopping unique
          rat accessories!
        </h3>
      </div>
      <div>
        <AllProducts />
      </div>
    </div>
  )
}
