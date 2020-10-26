import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import jwtDecode from 'jwt-decode'
import themeObj from './util/theme'
import Navbar from './components/Navbar'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logOutMonk, getMonkData } from './redux/actions/monkActions'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Monk from './pages/Monk'
import AuthRoute from './util/AuthRoute'
import axios from 'axios'

const theme = createMuiTheme(themeObj)

const token = localStorage.AuthToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.iat * 10000 < Date.now()) {
    store.dispatch(logOutMonk())
    window.location.href = '/'
  }
 else {
  store.dispatch({ type: SET_AUTHENTICATED })
  axios.defaults.headers.common['AuthToken'] = token
  store.dispatch(getMonkData())
}
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/signup' component={SignUp} />
                <Route exact path='/monks/:handle' component={Monk} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
