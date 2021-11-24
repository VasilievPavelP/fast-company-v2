import React from 'react'
import PropTypes from 'prop-types'

const TextareaField = ({ label, rows, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor='validationCustom04' className='form-label'>
          {label}
        </label>
      )}
      <textarea
        name={name}
        id='validationCustom04'
        rows={rows}
        className={getInputClasses()}
        value={value}
        onChange={handleChange}
      ></textarea>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextareaField.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default TextareaField
