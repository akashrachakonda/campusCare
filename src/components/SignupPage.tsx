import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import React from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: any) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveChanges = (e: any) => {
    console.log("saveChanges");
    e.preventDefault();
    axios
      .post("http://localhost:5173/signup", user)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <form onSubmit={saveChanges}>
        <div className="form-group">
          <label className="fullName">Full name</label>
          <input
            name="fullname"
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter Full Name"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="email">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label className="password" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label className="confirmPassword" htmlFor="exampleInputPassword1">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder=" Confirm Password"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label className="phoneNumber" htmlFor="phone">
            Phone number
          </label>
          <input
            name="phone"
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label className="role" htmlFor="role">
            Role
          </label>
          <select
            className="form-control"
            id="roleSelect"
            name="role"
            onChange={handleInput}
            defaultValue="1"
            required
          >
            <option value="1">Student</option>
            <option value="2">Faculty</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>

        <div className="signupblock">
          <small className="mr-2">Already have an account ?</small> &nbsp;
          <button type="button" className="btn btn-primary btn-sm">
            <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
