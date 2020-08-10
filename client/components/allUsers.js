import React from 'react'
import {getAllUsersThunk} from '../store/allUsers'
import {connect} from 'react-redux'
import User from './User'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div>
        {this.props.users
          ? this.props.users.map(user => <User key={user.id} {...user} />)
          : ''}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(getAllUsersThunk())
})

export default connect(mapState, mapDispatch)(AllUsers)
