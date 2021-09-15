import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../../firebase/db';

const FilterByUser = ({ onFilter }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getAllUsers();
      return fetchedUsers;
    }

    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const changeHandler = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="mb-4 col-3">
      <span>Filter by user</span>
      <input
        list="users"
        placeholder="Start typing..."
        className="form-control"
        onChange={(e) => changeHandler(e)}
      />
      <datalist id="users">
        {
          users.map((user) => (
            <option value={user.data().email}>{user.data().email}</option>
          ))
        }
      </datalist>
    </div>
  );
};

FilterByUser.propTypes = {
  onFilter: PropTypes.func
};

FilterByUser.defaultProps = {
  onFilter: null
};

export default FilterByUser;
