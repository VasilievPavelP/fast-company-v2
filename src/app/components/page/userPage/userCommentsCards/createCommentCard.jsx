import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../../../api'
import { validator } from '../../../../utils/validator'
import SelectField from '../../../common/form/selectField'
import TextareaField from '../../../common/form/textareaField'

const CreateCommentCard = ({ userId }) => {
  const [users, setUsers] = useState([])
  const [data, setData] = useState({
    pageId: userId,
    userId: '',
    content: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const validatorConfog = {
    userId: {
      isRequired: {
        message: 'Выберите отправителя',
      },
    },
    content: {
      isRequired: {
        message: 'Напишите что-нибудь',
      },
    },
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfog)

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    api.comments.add(data)
    setData({
      pageId: userId,
      userId: '',
      content: '',
    })
  }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h2>New comment</h2>
          <SelectField
            defaultOption="Ты кто?"
            name="userId"
            options={users}
            onChange={handleChange}
            value={data.userId}
            error={errors.userId}
          />
          <TextareaField
            label="Соощение"
            name="content"
            rows="3"
            onChange={handleChange}
            value={data.content}
            error={errors.content}
          />
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

CreateCommentCard.propTypes = {
  userId: PropTypes.string,
}

export default CreateCommentCard
