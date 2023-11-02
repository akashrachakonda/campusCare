import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onLogin = (e: any) => {
    e.preventDefault();

    const details: any = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", details)
      .then((res) => {
        console.log("res--->", res);
        if (res.data.Login) {
          localStorage.setItem("username", res.data.username);

          // Your component rendering and return statements

          navigate("/");
        } else {
          alert(
            "No matching record exists. Please verify your email and password."
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" login">
      <form onSubmit={onLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        <div className="form-group">
          <label className="password" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}
        <br />
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <div className="signupblock">
          <small className="mr-2">Don't have an account ?</small> &nbsp;
          <button type="button" className="btn btn-primary btn-sm">
            <Link to="/signup" className="nav-link active" aria-current="page">
              Signup
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
