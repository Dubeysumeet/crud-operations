import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa'; // Importing action icons
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get('http://localhost:81/crud-operations/backend/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }

  const handleEdit = (id) => {
    navigate(`/user/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:81/crud-operations/backend/api/user/${id}/delete`)
        .then((response) => {
          if (response.data.status === 1) {
            setUsers(users.filter(user => user.id !== id));
          } else {
            alert("Failed to delete user.");
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };

  const handleViewPassword = (id) => {
    axios.get(`http://localhost:81/crud-operations/backend/api/user/${id}`)
      .then((response) => {
        setSelectedUser(response.data);
        setShowModal(true);
        setShowPassword(false); 
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(selectedUser.password).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const confirmPasswordView = () => {
    setShowPassword(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPasswordVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {users.length === 0 ? (
        <div className="no-data">Oops! No data is present.</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>
                  <FaEyeSlash className="eye-icon" onClick={() => handleViewPassword(user.id)} />
                  <FaEdit className="action-icon-edit" onClick={() => handleEdit(user.id)} />
                  <FaTrash className="action-icon-trash" onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            {!showPassword ? (
              <>
                <h3>View Password</h3>
                <p>Do you really want to see the password?</p>
                <button className="button" onClick={confirmPasswordView}>Yes</button>
                <button className="button" onClick={closeModal}>No</button>
              </>
            ) : (
              <div>
                <h3>Password</h3>
                <div className="password-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={selectedUser.password}
                    readOnly
                    className="input-disabled"
                  />
                  {passwordVisible ? (
                    <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                  )}
                </div>
                <div className="button-group">
                  <button className="button copy-button" onClick={handleCopyPassword}>
                    <FaCopy /> Copy Password
                  </button>
                  <button className="button close-button" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
