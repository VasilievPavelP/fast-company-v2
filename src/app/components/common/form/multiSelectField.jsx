import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { filterDefaultValueArray } from '../../../utils/filterDefaultValueArray'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options

  const handleChange = (value) => {
    onChange({ name: name, value: value })
  }

  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <Select
        defaultValue={filterDefaultValueArray(defaultValue, optionsArray)}
        closeMenuOnSelect={false}
        isMulti
        options={optionsArray}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
}

export default MultiSelectField
