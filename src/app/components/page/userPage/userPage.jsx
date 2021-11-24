import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../../../api'
import UserCard from './userInfoCards/userCard'
import QualitiesCard from './userInfoCards/qualitiesCard'
import MeetingCard from './userInfoCards/meetingsCard'
import CreateCommentCard from './userCommentsCards/createCommentCard'
import CommentsCard from './userCommentsCards/commentsCard'

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  const [comments, setComments] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }, [comments])

  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }

  const deleteComment = (id) => {
    api.comments.remove(id)
  }

  if (user) {
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <UserCard
              name={user.name}
              profession={user.profession.name}
              rate={user.rate}
              id={user._id}
              onClick={handleClick}
            />
            <QualitiesCard qualities={user.qualities} />
            <MeetingCard meetings={user.completedMeetings} />
          </div>
          <div className='col-md-8'>
            <CreateCommentCard userId={userId} />
            {comments.length !== 0 && (
              <CommentsCard comments={comments} deleteComment={deleteComment} />
            )}
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
