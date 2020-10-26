import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import VoteButton from './VoteButton'
import Enlightens from './Enlightens'
import EnlightenForm from './EnlightenForm'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'
import { getEngrave, clearErrors, getEnlighten } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.spredIt,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  post: {
    width: 500,
    height: 500
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})

class EngraveDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname

    const { handle, engraveId } = this.props
    const newPath = `/monks/${handle}/engrave/${engraveId}`

    if (oldPath === newPath) oldPath = `/monk/${handle}`

    window.history.pushState(null, null, newPath)

    this.setState({ open: true, oldPath, newPath })
    this.props.getEngrave(this.props.engraveId)
    this.props.getEnlighten(this.props.engraveId)
  }

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false })
    this.props.clearErrors()
  }

  render() {
    const {
      classes,
      enlightens,
      engrave: {
        _id,
        body,
        createdAt,
        voteCount,
        enlightenCount,
        monkImg,
        image,
        handle
      },
      UI: { loading }
    } = this.props

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={12}>
        <Grid item sm={5}>
          <img src={monkImg ? "data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(monkImg.data))):null} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/monks/${handle}`}
          >
            @{handle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          {image ? <img src={"data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(image.data)))} alt="Profile" className={classes.post} /> : <Typography variant="body1">{body}</Typography>}
          <VoteButton engraveId={_id} voteCount={voteCount}/>
          <MyButton tip="enlightens">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{enlightenCount} enlightens</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <EnlightenForm engraveId={_id} />
        <Enlightens engraveId={_id} enlightens={enlightens} monk={this.props.monk} />
      </Grid>
    )
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand engrave"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

EngraveDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getEngrave: PropTypes.func.isRequired,
  getEnlighten: PropTypes.func.isRequired,
  engraveId: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  engrave: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  engrave: state.data.engrave,
  enlightens: state.data.enlightens,
  UI: state.UI
})

const mapActionsToProps = {
  getEngrave,
  getEnlighten,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EngraveDialog))