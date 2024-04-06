import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    showNavItems: false,
  }

  toggleNavItemsView = () => {
    this.setState(prevState => ({showNavItems: !prevState.showNavItems}))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  getClassNameFor = path => {
    const {match} = this.props
    const currentPath = match.path
    if (currentPath === path) {
      return 'nav-item-selected-link'
    }
    return 'nav-item-link'
  }

  renderNavItemsContainer = mobile => (
    <ul className={`nav-item-container${mobile}`}>
      <li className="nav-item">
        <Link className={this.getClassNameFor('/')} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className={this.getClassNameFor('/cart')} to="/cart">
          Cart
        </Link>
      </li>
      <li className="nav-item">
        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </li>
      <button
        type="button"
        className="nav-button"
        onClick={this.toggleNavItemsView}
      >
        {' '}
        <AiFillCloseCircle className="close" />
      </button>
    </ul>
  )

  render() {
    const {showNavItems} = this.state
    return (
      <nav className="navbar">
        <div className="logo-hamburger-container">
          <Link className="website-logo-container" to="/">
            <img
              src="https://res.cloudinary.com/dtrfmlzrw/image/upload/v1712399042/Frame_276_headerlogo_l9fmke.png"
              alt="website-logo"
            />
            <h1 className="website-title">Tasty Kitchens</h1>
          </Link>
          <button
            type="button"
            className="nav-button"
            onClick={this.toggleNavItemsView}
          >
            {' '}
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </div>
        {this.renderNavItemsContainer('')}
        {showNavItems && this.renderNavItemsContainer('-mobile')}
      </nav>
    )
  }
}

export default withRouter(Header)
