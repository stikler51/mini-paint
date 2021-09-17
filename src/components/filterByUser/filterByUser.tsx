import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../firebase/db';

type filteProps = {
  onFilter: (value: string) => void;
}

const FilterByUser = ({ onFilter }: filteProps) => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getAllUsers();
      return fetchedUsers;
    }

    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const changeHandler = (data: string) => {
    onFilter(data);
  };

  return (
    <div className="mb-4 col-3">
      <span>Filter by user</span>
      <input
        list="users"
        placeholder="Start typing..."
        className="form-control"
        onChange={(e) => changeHandler(e.currentTarget.value)}
      />
      <datalist id="users">
        {
          users.map((user: any) => (
            <option key={user.data().email} value={user.data().email}>{user.data().email}</option>
          ))
        }
      </datalist>
    </div>
  );
};

export default FilterByUser;
