import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import Notifications from './Notifications'
import PostEngrave from './PostEngrave'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import HomeIcon from '@material-ui/icons/Home'

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                {authenticated ? (
                    <Fragment>
                        <PostEngrave />
                            <Link to="/">
                                <MyButton tip="Home">
                                 <HomeIcon />
                                </MyButton>
                            </Link>
                                <Notifications />
                    </Fragment>
                    ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            SignUp
                        </Button>
                    </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    credentials: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    authenticated: state.monk.authenticated,
    credentials: state.monk.credentials
  })
  
  export default connect(mapStateToProps)(Navbar)
