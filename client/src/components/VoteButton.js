import React, { Component, Fragment } from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { voteEngrave, unvoteEngrave } from '../redux/actions/dataActions'
import { ArrowUpward } from '@material-ui/icons'

class VoteButton extends Component {

  votedEngrave = () => {
    if (
      this.props.monk.votes &&
      this.props.monk.votes.find(
        (vote) => ((vote.engraveId === this.props.engrave._id)) && (this.props.engrave.handle === vote.handle))
    ) return true
    else return false
  }

  voteEngrave = () => {
    this.props.voteEngrave(this.props.engraveId)
  }

  unvoteEngrave = () => {
    this.props.unvoteEngrave(this.props.engraveId)
  }

  render() {
    const { monk: { authenticated } } = this.props
    const voteButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Vote" onClick={this.voteEngrave}>
             <ArrowUpward color="primary" />
            </MyButton>
            <span>{this.props.voteCount} votes</span>
      </Link>
    ) : (
      this.votedEngrave() ? (
        <Fragment>
          <MyButton tip="Vote" onClick={this.voteEngrave}>
             <ArrowUpward color="primary" />
            </MyButton>
            <span>{this.props.voteCount} votes</span>
        </Fragment>
           ) :(
        <Fragment>
          <MyButton tip="Undo vote" onClick={this.unvoteEngrave}>
             <ArrowUpward color="primary" />
          </MyButton>
           <span>{this.props.voteCount} votes</span>
        </Fragment>
           )
      )
    return voteButton
  }
}

VoteButton.propTypes = {
  monk: PropTypes.object.isRequired,
  engraveId: PropTypes.string,
  voteEngrave: PropTypes.func.isRequired,
  unvoteEngrave: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  monk: state.monk
})

const mapActionsToProps = {
  voteEngrave,
  unvoteEngrave
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VoteButton)