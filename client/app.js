import React from 'react'

import {Navbar, Header, Footer} from './components'

import Routes from './routes'

const App = () => {
  return (
    <div id="app">
      <Header />
      <div id="main">
        <Navbar />

        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default App
