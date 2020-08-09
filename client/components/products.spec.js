import {expect} from 'chai'
import React from 'react'
import {Provider} from 'react-redux'
import store from '../store'
import {Link} from 'react-router-dom'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import {SingleProductView} from './SingleProduct'
import ProductView from './ProductView'

const adapter = new Adapter()
enzyme.configure({adapter})

// describe('AllProducts component', () => {
//   let allProducts

//   beforeEach(() => {
//     allProducts = shallow(<AllProducts />)
//     console.dir(allProducts)
//   })

//   it('renders strings Sort: and Filter: in h2 elements', () => {
//     console.log(allProducts.find('h2'))
//     console.log(allProducts.find('h2').text())
//     expect(allProducts.find('h2').text()).to.be.equal('Sort:,Filter:')
//   })
// })

describe('Single product view', () => {
  let singleProduct
  let product = {
    name: 'al',
    id: 4,
    imageUrl: 'https://i.ytimg.com/vi/iMVh5uO3FSA/maxresdefault.jpg',
    price: 900
  }

  beforeEach(() => {
    singleProduct = shallow(<SingleProductView product={product} />)
  })

  it('renders the product name in an h1', () => {
    expect(singleProduct.find('h1').text()).to.be.equal('al')
  })
})

describe('All products view', () => {
  let productView
  let product = {
    name: 'al',
    id: 4,
    imageUrl: 'https://i.ytimg.com/vi/iMVh5uO3FSA/maxresdefault.jpg'
  }

  before(() => {
    productView = shallow(<ProductView product={product} />)
  })

  it('renders a single product name', () => {
    expect(productView.find('div').text()).to.be.equal('al')
  })

  it('renders a link to the product', () => {
    expect(productView.find('Link').text()).to.equal('<Link />')
  })
  it('renders link based on product id', () => {
    expect(productView.find('Link').prop('to')).to.equal('/products/4')
  })

  it('renders an img', () => {
    expect(productView.find('img').prop('src')).to.equal(
      'https://i.ytimg.com/vi/iMVh5uO3FSA/maxresdefault.jpg'
    )
  })
})
