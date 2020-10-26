import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

import NotificationsIcon from '@material-ui/icons/Notifications'
import { ArrowUpward } from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'
import { markNotificationsRead, getNotifications } from '../redux/actions/monkActions'

class Notifications extends Component {
  state = {
    anchorEl: null
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target })
    this.props.getNotifications()
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not._id)
    this.props.markNotificationsRead(unreadNotificationsIds)
  }

  render() {
    const notifications = this.props.notifications
    const anchorEl = this.state.anchorEl

    dayjs.extend(relativeTime)

    let notificationsIcon
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />)
    } else {
      notificationsIcon = <NotificationsIcon />
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'vote' ? 'voted' : 'enlightened on'
          const time = dayjs(not.createdAt).fromNow()
          const iconColor = not.read ? 'primary' : 'secondary'
          const icon =
            not.type === 'vote' ? (
              <ArrowUpward color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            )

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/monks/${not.recipient}/engrave/${not.engraveId}`}
              >
                {not.sender} {verb} your engrave {time}
              </Typography>
            </MenuItem>
          )
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      )
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    )
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func,
  getNotifications: PropTypes.func,
  notifications: PropTypes.array
}

const mapStateToProps = (state) => ({
  notifications: state.monk.notifications
})

export default connect(
  mapStateToProps,
  { markNotificationsRead, getNotifications }
)(Notifications)