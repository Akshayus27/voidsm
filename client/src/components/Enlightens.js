import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteEnlighten from './DeleteEnlighten'

const styles = (theme) => ({
  ...theme.spreadIt,
  enlightenImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  enlightenData: {
    marginLeft: 20
  }
})

class Enlightens extends Component {

  render() {
    const { enlightens, engraveId, classes, monk: { authenticated, credentials } } = this.props

    return (
      <Grid container>
        {enlightens ? enlightens.map((enlighten, index) => {
          const { body, createdAt, image, handle } = enlighten
          return (
            <Fragment key={createdAt}>
              <Grid item sm={10}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={image ? "data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(image.data))) : null}
                      alt="enlighten"
                      className={classes.enlightenImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.enlightenData}>
                      <div style={{ display: 'flex',position: 'relative' }}>
                        {authenticated && handle === credentials.handle ? (
                          <DeleteEnlighten engraveId={engraveId} />
                        ) : null
                        }
                      </div>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/monks/${handle}`}
                        color="primary"
                      >
                        {handle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== enlightens.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          )
        }) : null}
      </Grid>
    )
  }
}

Enlightens.propTypes = {
  enlightens: PropTypes.array.isRequired,
}

export default withStyles(styles)(Enlightens)