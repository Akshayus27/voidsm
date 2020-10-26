import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'
import ProfileSkeleton from '../util/ProfileSkeleton'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'

import {AddAPhoto, HomeWork, Schedule} from '@material-ui/icons'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import { connect } from 'react-redux'
import { logOutMonk, uploadImage } from '../redux/actions/monkActions'

const styles = (theme) => ({
    ...theme.spreadIt
})

class Profile extends Component {

      handleImageChange = (event) => {
        const image = event.target.files[0]
        let formData = new FormData()
        formData.set('image', image, image.name)
        this.props.uploadImage(formData)
      }

      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
      }

      handleLogout = () => {
        this.props.logOutMonk()
      }

    render() {
        const {classes, monk:{credentials:{handle, createdAt, image, bio, location}, loading, authenticated}} = this.props
        
        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={image ? "data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(image.data))):null} alt="profile" className="profile-image" />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip="Edit profile picture"
                                onClick={this.handleEditPicture}
                                btnClassName="button"
                            >
                                <AddAPhoto color="primary" />
                            </MyButton>
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
                                <HomeWork color="primary" /> <span>{location}</span>
                                <hr />
                            </Fragment>
                            )}
                            <Schedule color="primary" />{' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                        <MyButton tip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No profile found, please login again
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/signup"
                            >
                                SignUp
                            </Button>
                        </div>
                    </Paper>
                )
        ) : (
                <ProfileSkeleton />
            )

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    monk: state.monk
})

const mapActionsToProps = { logOutMonk, uploadImage}

Profile.propTypes = {
    logOutMonk: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    monk: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile))
