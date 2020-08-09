import React from 'react'

const User = props => {
  return (
    <div className="user">
      <h4>{`${props.firstName} ${props.lastName}`}</h4>
      <span>{props.email}</span>
    </div>
  )
}

export default User
