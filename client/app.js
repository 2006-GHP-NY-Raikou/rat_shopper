import React from 'react'

import {Navbar, Header} from './components'

import Routes from './routes'

const App = () => {
  return (
    <div>
      <Header />
      <div id="main">
        <Navbar />

        <Routes />
      </div>
    </div>
  )
}

export default App
