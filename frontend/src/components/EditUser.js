import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:81/crud-operations/backend/api/user/${id}`)
      .then((response) => {
        setInputs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
        setError("Could not fetch user data.");
      });
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    axios.put(`http://localhost:81/crud-operations/backend/api/user/${id}/edit`, inputs)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          console.error("Backend error:", error.response.data);
          setError(error.response.data.message || "An error occurred.");
        } else {
          console.error("Network error:", error.message);
          setError("Network error. Please try again.");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>Edit User</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <table cellSpacing="10">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="name">Name: </label>
                </th>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={inputs.name || ""}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">Email: </label>
                </th>
                <td>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="dob">Date of Birth: </label>
                </th>
                <td>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={inputs.dob || ""}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password">Password: </label>
                </th>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={togglePasswordVisibility} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="submit-button" type="submit">Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
