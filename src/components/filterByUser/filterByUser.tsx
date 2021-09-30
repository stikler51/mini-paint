import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadAllUsers, filterByUser } from '../../store/filterSlice'
import { UserObjectType } from '../../types/types'

const FilterByUser = () => {
  const { users } = useAppSelector((state) => state.filter.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadAllUsers())
  }, [])

  return (
    <div className="mb-4 col-3">
      <span>Filter by user</span>
      <input
        list="users"
        placeholder="Start typing..."
        className="form-control"
        onChange={(e) => dispatch(filterByUser(e.currentTarget.value))}
      />
      <datalist id="users">
        {users.map((user: UserObjectType) => (
          <option key={user.email} value={user.email}>
            {user.email}
          </option>
        ))}
      </datalist>
    </div>
  )
}

export default FilterByUser
