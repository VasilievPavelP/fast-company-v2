import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения.' },
      isEmail: { message: 'Электронная почта введена некоректно.' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения.' },
      isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву.' },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одну цифру.' },
      min: { message: 'Пароль должен состоять минимум из 8 символов.', value: 8 }
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию.' }
    },
    licence: {
      isRequired: { message: 'Вы не можете пользоваться нашим сервисом без лицензионного соглашения.' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Password'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label='Выберите вашу профессию'
        onChange={handleChange}
        options={professions}
        defaultOption='Choose...'
        value={data.profession}
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
        label='Выберите ваши качетсва'
        options={qualities}
        onChange={handleChange}
        name='qualities'
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить лицензионное соглашение
      </CheckBoxField>
      <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
