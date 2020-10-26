import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux';
import { deleteEnlighten } from '../redux/actions/dataActions'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
}

class DeleteEnlighten extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  DeleteEnlighten = () => {
    this.props.deleteEnlighten(this.props.engraveId)
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <MyButton
          tip="Delete Enlighten"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this engrave ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.DeleteEnlighten} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

DeleteEnlighten.propTypes = {
  deleteEnlighten: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  engraveId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteEnlighten }
)(withStyles(styles)(DeleteEnlighten));