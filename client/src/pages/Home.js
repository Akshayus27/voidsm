import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Engrave from '../components/Engrave'
import Profile from '../components/Profile'
import EngraveSkeleton from '../util/EngraveSkeleton'

import { connect } from 'react-redux'
import { getEngraves } from '../redux/actions/dataActions'

class Home extends Component {
    componentDidMount() {
        this.props.getEngraves()
    }

    render() {
        const { engraves, loading } = this.props.data
        let recentEngraves = !loading ? (
            engraves.map(engrave => <Engrave key={engrave._id} engrave={engrave} />)
        ) : (<EngraveSkeleton/>)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <div>{recentEngraves}</div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getEngraves: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(
    mapStateToProps,
    { getEngraves }
)(Home)