import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../api'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import { validator } from '../../utils/validator'

const UserForm = ({ user, professions, qualities, update }) => {
  // const history = useHistory()

  if (user && qualities) {
    const [data, setData] = useState(user)
    const [errors, setErrors] = useState({})

    const validatorConfig = {
      name: {
        isRequired: { message: 'Ну имя то оставь' }
      },
      email: {
        isRequired: { message: 'Электронная почта обязательна для заполнения' },
        isEmail: { message: 'Электронная почта введена некоректно' }
      }
    }

    useEffect(() => {
      validate()
      console.log(data)
    }, [data])

    const validate = () => {
      const errors = validator(data, validatorConfig)

      setErrors(errors)
      return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleChange = async (target) => {
      if (target.name === 'qualities') {
        setData((prevState) => ({
          ...prevState,
          qualities: [...target.value.map(item => (
            api.qualities
              .getById(item.value)
              .then((data) => data)
          ))]
        }))
      } else {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      // const isValid = validate()
      // if (!isValid) return
      // update(user._id, data)
      // history.push(`/users/${user._id}`)
      console.log(data.qualities)
    }

    return (
      <div className='container w-50'>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Имя'
            name='name'
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label='Почта'
            name='email'
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <SelectField
            label='Выберите вашу профессию'
            onChange={handleChange}
            options={professions}
            defaultOption={data.profession.name}
            value={data.profession.name}
            error={errors.profession}
          />
          <RadioField
            options={[
              { name: 'Male', value: 'male' },
              { name: 'Female', value: 'female' },
              { name: 'Other', value: 'other' }
            ]}
            label='Выберите ваш пол'
            value={data.sex}
            name='sex'
            onChange={handleChange}
          />
          <MultiSelectField
            defaultValue={data.qualities}
            label='Выберите ваши качетсва'
            options={qualities}
            onChange={handleChange}
            name='qualities'
          />
          <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>
            Обновить
          </button>
        </form>
        <Link className='btn btn-secondary w-100 mt-4' to={`/users/${user._id}`}>
          Отмена
        </Link>
      </div>
    )
  }
  return <h1>Loading...</h1>
}

UserForm.propTypes = {
  user: PropTypes.object,
  professions: PropTypes.object,
  qualities: PropTypes.object,
  update: PropTypes.func
}

export default UserForm
