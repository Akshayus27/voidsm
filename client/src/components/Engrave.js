import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import EngraveDialog from './EngraveDialog'
import MyButton from '../util/MyButton'
import VoteButton from './VoteButton'

import { connect } from 'react-redux'
import { voteEngrave, unvoteEngrave } from '../redux/actions/dataActions'
import DeleteEngrave from './DeleteEngrave'

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    dp: {
        width: 150,
        height: 150
    },
    post: {
        width: 500,
        height: 500
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Engrave extends Component {

    render() {
        dayjs.extend(relativeTime)
        const { classes, engrave: { monkImg, body, createdAt, handle, _id, voteCount, enlightenCount, image}, monk: {authenticated, credentials} } = this.props
        const deleteButton =
                authenticated && handle === credentials.handle ? (
                <DeleteEngrave engraveId={_id} />
                ) : null
        return (
            <Card className={classes.card}>
                <CardMedia 
                 image={monkImg ? "data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(monkImg.data))):null}           
                 title="Profile pic"
                 className={classes.dp}
                 />
                 <CardContent className={classes.content}>
                     <Typography 
                        variant='h5' 
                        component={Link} 
                        to={`/monks/${handle}`}
                        color='secondary'
                     >
                         {handle}
                     </Typography>
                     {deleteButton}
                     <Typography variant='body2' color='textSecondary'>
                         {dayjs(createdAt).fromNow()}
                     </Typography>
                     <Typography variant='body1'>
                         {body}
                     </Typography>
                     {image ? (<CardMedia 
                        image={"data:image;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(image.data)))}           
                        title="Engrave pic"
                        className={classes.post}
                    />):(null)}
                     <VoteButton key={voteCount} voteCount={voteCount} engraveId={_id} engrave={this.props.engrave} />
                     <MyButton tip="enlightens">
                        <ChatIcon color="primary" />
                     </MyButton>
                     <span>{enlightenCount} enlightens</span>
                     <EngraveDialog
                        engraveId={_id}
                        handle={handle}
                        monk={this.props.monk}
                        openDialog={this.props.openDialog}
                    />
                 </CardContent>
            </Card>
        )
    }
}

Engrave.propTypes = {
    monk: PropTypes.object.isRequired,
    voteEngrave: PropTypes.func.isRequired,
    unvoteEngrave: PropTypes.func.isRequired,
    engrave: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    monk: state.monk
  })

  const mapActionsToProps = (state) => ({
      voteEngrave,
      unvoteEngrave
  })

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Engrave))