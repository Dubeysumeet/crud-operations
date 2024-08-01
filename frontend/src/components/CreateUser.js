import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const CreateUser = () => {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage({ text: "", type: "" });

    axios
      .post("http://localhost:81/crud-operations/backend/api/user/save", inputs)
      .then((response) => {
        console.log(response.data);
        setMessage({ text: "User created successfully!", type: "success" });
        setInputs({});
        setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        if (error.response) {
          console.error("Backend error:", error.response.data);
          setMessage({ text: error.response.data.message || "An error occurred.", type: "error" });
        } else {
          console.error("Network error:", error.message);
          setMessage({ text: "Network error. Please try again.", type: "error" });
        }
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      });
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      {message.text && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={inputs.dob || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;