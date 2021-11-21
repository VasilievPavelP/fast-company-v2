import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../../../api'
import UserCard from './userInfoCards/userCard'
import QualitiesCard from './userInfoCards/qualitiesCard'
import MeetingCard from './userInfoCards/meetingsCard'
import CreateCommentCard from './userCommponentsCards/createCommentCard'
import CommentsCard from './userCommponentsCards/commentsCard'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession.name}
              rate={user.rate}
              onClick={handleClick}
            />
            <QualitiesCard qualities={user.qualities}/>
            <MeetingCard meetings={user.completedMeetings}/>
          </div>
          <div className="col-md-8">
            <CreateCommentCard />
            <CommentsCard />
          </div>
        </div>
      </div>
    )
  } else {
    return <h1>Loading</h1>
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserPage
