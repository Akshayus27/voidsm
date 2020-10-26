import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = (theme) => ({
  ...theme.spreadIt
})

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, image, bio, location }
  } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={image ? "data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(image.data))):null} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/monks/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)