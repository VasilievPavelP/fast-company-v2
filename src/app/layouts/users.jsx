import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from '../components/common/pagination'
import UserTable from '../components/ui/userTable'
import api from '../api'
import GroupList from '../components/common/groupList'
import SearchStatus from '../components/ui/searchStatus'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import TableSearch from '../components/common/table/tableSearch'

const Users = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [qualities, setQualities] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const [search, setSearch] = useState('')
  const params = useParams()
  const pageSize = 4

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, search])

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
    if (search !== '') setSearch('')
    setSelectedProf(item)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userId = params.userId
  const updateParams = params.update

  useEffect(() => {
    api.users.getById(userId).then((data) => setSelectedUser(data))
  }, [userId])

  const handleSearch = ({ target }) => {
    setSelectedProf()
    setSearch(target.value)
  }

  if (userId) {
    return (
      <UserPage
        user={selectedUser}
        id={userId}
        updateParams={updateParams}
        professions={professions}
        qualities={qualities}
        update={api.users.update}
      />
    )
  } else {
    if (users) {
      const filteredUsers = search
        ? users.filter((user) => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        : selectedProf
        ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users

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
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className='btn btn-secondary mt-2' onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className='d-flex flex-column'>
            <SearchStatus length={count} />
            <TableSearch value={search} onChange={handleSearch} />
            {count > 0 && (
              <UserTable
                onSort={handleSort}
                users={usersCrop}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                selectedSort={sortBy}
              />
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
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
