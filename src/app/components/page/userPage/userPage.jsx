import React from 'react'
import Quality from '../../ui/qualities/quality'
import UserForm from '../../ui/userForm'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserPage = ({ user, id, updateParams, professions, qualities, update }) => {
  if (user) {
    if (updateParams) {
      return (
        <UserForm
          user={user}
          professions={professions}
          qualities={qualities}
          update={update}
        />
      )
    }
    return (
      <div className='container'>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        {user.qualities.map((qualitie) => (
          <Quality key={qualitie._id} color={qualitie.color} name={qualitie.name} _id={qualitie._id} />
        ))}
        <h4>Встретился, раз:{user.completedMeetings}</h4>
        <h4>Рейтинг: {user.rate}</h4>
        <div className='w-50'>
          <Link className='btn btn-secondary d-block w-50 mb-4' to={`/users/${user._id}/update`}>
            Изменить
          </Link>
          <Link className='btn btn-primary d-block w-50' to='/users'>
            Все пользователи
          </Link>
        </div>
      </div>
    )
  }

  return <h1>Loading...</h1>
}

UserPage.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
  updateParams: PropTypes.string,
  professions: PropTypes.object,
  qualities: PropTypes.object,
  update: PropTypes.func
}

export default UserPage
