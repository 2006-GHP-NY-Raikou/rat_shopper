/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as SingleUser} from './SingleUser'

export {default as SingleProduct} from './SingleProduct'
export {default as ProductView} from './ProductView'
export {default as AllProducts} from './AllProducts'
export {default as NewProduct} from './NewProduct'
export {default as UpdateProduct} from './UpdateProduct'
export {default as RemoveProduct} from './RemoveProduct'
export {default as Cart} from './Cart'
export {default as AllUsers} from './AllUsers'
export {default as UpdateCartSingleProduct} from './UpdateCartSingleProduct'
export {default as Home} from './Home'
export {default as UserHome} from './user-home.js'
export {Login, Signup} from './Login'
