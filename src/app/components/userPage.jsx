import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserPage = ({ user, id }) => {
  if (user) {
    return (
      <div className='container'>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        {user.qualities.map((qualitie) => (
          <Quality key={qualitie._id} color={qualitie.color} name={qualitie.name} _id={qualitie._id} />
        ))}
        <h4>Встретился, раз:{user.completedMeetings}</h4>
        <h4>Рейтинг: {user.rate}</h4>
        <Link className='btn btn-primary' to='/users'>
          Все ползователи
        </Link>
      </div>
    )
  }

  return <h1>Loaging...</h1>
}

UserPage.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object
}

export default UserPage
