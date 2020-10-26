import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { connect } from 'react-redux'
import { submitEnlighten } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.spreadIt
})

class EnlightenForm extends Component {
  state = {
    body: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitEnlighten(this.props.engraveId, { body: this.state.body })
    this.setState({ body: '' })
  }

  render() {
    const { classes, authenticated } = this.props
    const errors = this.state.errors

    const enlightenFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Enlighten on engrave"
            error={errors.enlighten ? true : false}
            helperText={errors.enlighten}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null
    return enlightenFormMarkup
  }
}

EnlightenForm.propTypes = {
  submitEnlighten: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  engraveId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.monk.authenticated
})

export default connect(
  mapStateToProps,
  { submitEnlighten }
)(withStyles(styles)(EnlightenForm))