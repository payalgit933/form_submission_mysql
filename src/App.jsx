import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    contact: "",
    gender: "male"
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post("http://localhost:5000/students", form);
      setForm({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        contact: "",
        gender: "male"
      });
      fetchStudents();
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      contact: "",
      gender: "male"
    });
  };

  return (
    <div className="App">
      <h1>Form Submission</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />

          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />

          <label>Address*</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />

          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label>Contact*</label>
          <input
            type="tel"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter Mobile number"
            required
          />

          <label>Gender*</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="other"
            checked={form.gender === "other"}
            onChange={handleChange}
          />
          Other

          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </form>
      </fieldset>

      <div className="submitted-users">
        <h2>Submitted Users</h2>
        <ul>
          {students.map((s) => (
            <li key={s.id} className="user-card">
              <strong>Name:</strong> {s.firstName} {s.lastName} <br />
              <strong>Address:</strong> {s.address} <br />
              <strong>Email:</strong> {s.email} <br />
              <strong>Contact:</strong> {s.contact} <br />
              <strong>Gender:</strong> {s.gender}
            </li>
          ))}
        </ul>
</div>


    </div>
  );
}

export default App;
