import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../firebase/db'

type FilterProps = {
  onFilter: (value: string) => void
}

const FilterByUser = ({ onFilter }: FilterProps) => {
  const [users, setUsers] = useState<DocumentData[]>([])

  useEffect(() => {
    getAllUsers().then((data: QueryDocumentSnapshot<DocumentData>[]) => {
      const usersData: DocumentData[] = data.map((user) => user.data())
      setUsers(usersData)
    })
  }, [])

  return (
    <div className="mb-4 col-3">
      <span>Filter by user</span>
      <input
        list="users"
        placeholder="Start typing..."
        className="form-control"
        onChange={(e) => onFilter(e.currentTarget.value)}
      />
      <datalist id="users">
        {users.map((user: DocumentData) => (
          <option key={user.email} value={user.email}>
            {user.email}
          </option>
        ))}
      </datalist>
    </div>
  )
}

export default FilterByUser
