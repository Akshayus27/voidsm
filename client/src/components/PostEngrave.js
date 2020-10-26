import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import EngraveIcon from '../images/engrave.jpg'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'react-redux'
import { postEngrave, clearErrors } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
})

class PostEngrave extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} })
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleEngravePicture = () => {
    const fileInput = document.getElementById('imageEngrave')
    fileInput.click()
  }

  handleEngraveImg = (event) => {
    const image = event.target.files[0]
    let formData = new FormData()
    formData.set('image', image, image.name)
    this.props.postEngrave(formData)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postEngrave({ body: this.state.body })
  }

  render() {
    const { errors } = this.state
    const {
      classes,
      UI: { loading }
    } = this.props

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Engrave">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>
            <img src={EngraveIcon} alt='monk' className={classes.icon} />
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <input
                type="file"
                id="imageEngrave"
                hidden="hidden"
                onChange={this.handleEngraveImg}
              />
              <MyButton
                tip="Upload picture"
                onClick={this.handleEngravePicture}
                btnClassName="button"
              >
                <PhotoCameraIcon color="primary" />
              </MyButton>
              <TextField
                name="body"
                type="text"
                label="Engrave your thoughts"
                multiline
                rows="3"
                placeholder="Engrave..."
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostEngrave.propTypes = {
  postEngrave: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { postEngrave, clearErrors }
)(withStyles(styles)(PostEngrave))