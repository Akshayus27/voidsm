import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AuthRoute = ({ component: Component , authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/>}
        />
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.monk.authenticated
})
  
AuthRoute.propTypes = {
    monk: PropTypes.object
}
  
export default connect(mapStateToProps)(AuthRoute)