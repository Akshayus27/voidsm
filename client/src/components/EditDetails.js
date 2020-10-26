import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'

import { connect } from 'react-redux'
import { editMonkDetails } from '../redux/actions/monkActions'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AssignmentInd } from '@material-ui/icons'

const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: 'right'
  }
});

class EditDetails extends Component {
  state = {
    bio: '',
    location: '',
    open: false
  }

  mapMonkDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : ''
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.mapMonkDetailsToState(this.props.credentials)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    const { credentials } = this.props
    this.mapMonkDetailsToState(credentials)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    const monkDetails = {
      bio: this.state.bio,
      location: this.state.location
    }
    this.props.editMonkDetails(monkDetails);
    this.handleClose();
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <MyButton
          tip="Edit Profile"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <AssignmentInd color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editMonkDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  credentials: state.monk.credentials
})

export default connect(
  mapStateToProps,
  { editMonkDetails }
)(withStyles(styles)(EditDetails));