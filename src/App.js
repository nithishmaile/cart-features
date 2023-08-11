import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartItems = cartList.filter(eachObj => eachObj.id !== id)
    this.setState({cartList: filterCartItems})
  }

  decrementCartItemQuantity = updatedQuantityId => {
    const {cartList} = this.state
    const updateQuantity = cartList.find(
      eachObj => eachObj.id === updatedQuantityId,
    )
    if (updateQuantity.quantity > 1) {
      this.setState(preVState => ({
        cartList: preVState.cartList.map(eachItem => {
          if (updatedQuantityId === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(updatedQuantityId)
    }
  }

  incrementCartItemQuantity = increamentUpdatedQuantityId => {
    this.setState(preVState => ({
      cartList: preVState.cartList.map(eachItem => {
        if (increamentUpdatedQuantityId === eachItem.id) {
          const increaseQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: increaseQuantity}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
