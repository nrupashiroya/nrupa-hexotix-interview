import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [userList, setUserLsit] = useState();
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);

  const getUsers = async () => {
    setLoader(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      setLoader(false);
      if (response?.status === 200) {
        if (search) {
          const filteredUsers = response?.data?.filter(user => user.username.toLowerCase().includes(search.toLowerCase()) || user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
          setUserLsit(filteredUsers);
          return;
        } else {
          setUserLsit(response?.data);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      setLoader(false);
      console.log({ error });
    }
  }

  useEffect(() => {
    if (!search) {
      getUsers();
    }
  }, [search])

  const handleSearch = () => {
    getUsers();
  }

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value.trim());
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <h2>User List</h2>
        <div className=''>
          <div class="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="search user..."
              value={search}
              onChange={handleSearchChange}
            />
            <span class="input-group-text" id="basic-addon2" onClick={handleSearch}><FaSearch /></span>
          </div>

        </div>
      </div>

      <Table responsive className='dashTable mb-0'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {!loader && userList?.length > 0 && userList?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loader &&
        <div className='text-center py-3'>
          <Spinner />
        </div>
      }

      {!loader && (userList?.length <= 0 || !userList) &&
        <p className='noDataP'>No Data Found!</p>
      }

    </>
  )
}

export default Dashboard