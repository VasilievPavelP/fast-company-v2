import React from 'react'
import PropTypes from 'prop-types'

const TableSearch = ({ value, onChange }) => {
  return (
    <div>
      <input className='form-control w-100' value={value} placeholder='Search..' type='text' onChange={onChange} />
    </div>
  )
}

TableSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TableSearch
