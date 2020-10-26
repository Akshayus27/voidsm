import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MonkIcon from '../images/void.jpg'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginMonk } from '../redux/actions/monkActions'

const styles = (theme) => ({
    ...theme.spreadIt
})

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errors: '',
            errKey: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors && nextProps.UI.errKey) {
            this.setState({
                errors: nextProps.UI.errors,
                errKey: nextProps.UI.errKey
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const monkData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginMonk(monkData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes, UI:{loading}, monk:{errors, errKey}} = this.props
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={MonkIcon} alt='monk' className={classes.icon}/>
                    <Typography
                        variant='h2'
                        className={classes.title}
                    >
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id='email' 
                            name='email' 
                            type='email' 
                            label='Email' 
                            className={classes.textField}
                            helperText={errKey === '"email"' ? errors : ''}
                            error={errKey === '"email"' ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth 
                        />
                        <TextField 
                            id='password' 
                            name='password' 
                            type='password' 
                            label='Password' 
                            className={classes.textField}
                            helperText={errKey === '"password"' ? errors : ''}
                            error={errKey === '"password"' ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth 
                        />
                        <Button 
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                        >Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <br/>
                        <small>Don't have an account? <Link to='/signup'>Sign Up</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginMonk: PropTypes.func.isRequired,
    monk: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    monk: state.monk,
    UI: state.UI
})

export default connect(mapStateToProps, {loginMonk})(withStyles(styles)(Login))