import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from '../components/pagination'
import UserTable from '../components/userTable'
import api from '../api'
import GroupList from '../components/groupList'
import SearchStatus from '../components/searchStatus'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import UserPage from '../components/userPage'

const Users = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const params = useParams()
  const pageSize = 4

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userId = params.userId

  useEffect(() => {
    api.users.getById(userId).then((data) => setSelectedUser(data))
  }, [userId])

  if (userId) {
    return <UserPage user={selectedUser} id={userId} />
  } else {
    if (users) {
      const filteredUsers = selectedProf ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users

      const count = filteredUsers.length
      const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
      const usersCrop = paginate(sortedUsers, currentPage, pageSize)
      const clearFilter = () => {
        setSelectedProf()
      }

      return (
        <div className='d-flex'>
          {professions && (
            <div className='d-flex flex-column flex-shrink-0 p-3'>
              <GroupList selectedItem={selectedProf} items={professions} onItemSelect={handleProfessionSelect} />
              <button className='btn btn-secondary mt-2' onClick={clearFilter}>
                {' '}
                Очиститть
              </button>
            </div>
          )}
          <div className='d-flex flex-column'>
            <SearchStatus length={count} />
            {count > 0 && <UserTable onSort={handleSort} users={usersCrop} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} selectedSort={sortBy} />}
            <div className='d-flex justify-content-center'>
              <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      )
    }
    return 'loading...'
  }
}

Users.propTypes = {
  users: PropTypes.array
}

export default Users