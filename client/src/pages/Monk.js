import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Engrave from '../components/Engrave'
import StaticProfile from '../components/StaticProfile'
import Grid from '@material-ui/core/Grid'

import EngraveSkeleton from '../util/EngraveSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

import { connect } from 'react-redux'
import { getMonkData } from '../redux/actions/dataActions'

class Monk extends Component {
  state = {
    profile: null,
    engraveIdParam: null
  }

  componentDidMount() {
    const handle = this.props.match.params.handle
    const engraveId = this.props.match.params.engraveId

    if (engraveId) this.setState({ engraveIdParam: engraveId })

    this.props.getMonkData(handle)
    axios
      .get(`/monk/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data
        })
      })
      .catch((err) => {return})
  }
  render() {
    const { engraves, loading } = this.props.data
    const { engraveIdParam } = this.state

    const engravesMarkup = loading ? (
      <EngraveSkeleton />
    ) : engraves === null ? (
      <p>No engraves from this monk</p>
    ) : !engraveIdParam ? (
      engraves.map((engrave) => <Engrave key={engrave._id} engrave={engrave} />)
    ) : (
      engraves.map((engrave) => {
        if (engrave._id !== engraveIdParam)
          return <Engrave key={engrave._id} engrave={engrave} />
        else return <Engrave key={engrave._id} engrave={engrave} openDialog />
      })
    )

    return (
      <Grid container spacing={12}>
        <Grid item sm={7} xs={8}>
          {engravesMarkup}
        </Grid>
        <Grid style={{paddingLeft: '20px'}}item sm={4} xs={8}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    )
  }
}

Monk.propTypes = {
  getMonkData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(
  mapStateToProps,
  { getMonkData }
)(Monk)