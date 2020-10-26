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
import { signUpMonk } from '../redux/actions/monkActions'

const styles = (theme) => ({
    ...theme.spreadIt
})

class SignUp extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            handle: '',
            loading: false,
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
        const newMonkData = {
            email: this.state.email,
            password: this.state.password,
            handle: this.state.handle
        }
        this.props.signUpMonk(newMonkData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props
        const {errors, loading, errKey} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={MonkIcon} alt='monk' className={classes.icon}/>
                    <Typography
                        variant='h2'
                        className={classes.title}
                    >
                        SignUp
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id='handle' 
                            name='handle' 
                            type='handle' 
                            label='Handle' 
                            className={classes.textField}
                            helperText={errKey === '"handle"' ? errors : ''}
                            error={errKey === '"handle"' ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth 
                        />
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
                        >Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <br/>
                        <small>Do you already have an account? <Link to='/login'>Login</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    signUpMonk: PropTypes.func.isRequired,
    monk: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    monk: state.monk,
    UI: state.UI
})

export default connect(mapStateToProps, {signUpMonk})(withStyles(styles)(SignUp))