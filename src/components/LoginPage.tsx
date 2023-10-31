import { Link } from "react-router-dom";
import "./Loginpage.css";

const Login = () => {
  return (
    <div className=" login">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="password" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="button" className="btn btn-primary">
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
