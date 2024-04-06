import Cookies from 'js-cookie'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    // console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // console.log(data)
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMessage = data.error_msg
      this.setState({showErrorMessage: true, errorMessage})
    }
  }

  render() {
    const {showErrorMessage, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route">
        <div className="form-card-container">
          <form onSubmit={this.onSubmitForm} className="login-form">
            <img
              src="https://res.cloudinary.com/dtrfmlzrw/image/upload/v1712370334/Frame_274_1_nuhnqd.png"
              alt="website-logo"
              className="website-logo"
            />
            <h1 className="website-name-login">Tasty kitchens</h1>
            <h1 className="website-logo-heading">Login</h1>
            <div className="input-boxes">
              <label className="login-input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                onChange={this.onChangeUserName}
                className="login-input"
                id="username"
              />
            </div>
            <div className="input-boxes">
              <label className="login-input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                onChange={this.onChangePassword}
                className="login-input"
                id="password"
              />
            </div>
            {showErrorMessage && (
              <p className="error-message">*{errorMessage}</p>
            )}
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
        <div className="website-landing-image-container-md">
          <img
            src="https://res.cloudinary.com/dtrfmlzrw/image/upload/v1712358335/Rectangle_1456_loginImage_abgl53.png"
            alt="website login"
            className="website-bg-img-md"
          />
        </div>
      </div>
    )
  }
}

export default Login
