import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts, SingleProduct} from './index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts component', () => {
  let allProducts

  // beforeEach(() => {
  //   allProducts = shallow(<AllProducts />)
  // })

  xit("renders h2 elements containing strings 'sort' and 'filter'", () => {
    const h2s = allProducts.find('h2')
    console.log(h2s)
    console.log(h2s.text())
    // expect(allProducts.find('h2').text()).to.be.equal(['Sort:', 'Filter:'])
  })
})

describe('SingleProduct component', () => {
  let singleProduct

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct />)
  })

  it("renders a div with the product's name", () => {
    console.log(singleProduct)
  })
})
