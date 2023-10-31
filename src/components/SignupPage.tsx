import { Link } from "react-router-dom";
import "./SignupPage.css";

const Signup = () => {
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="email">
            Email address
          </label>
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
            placeholder="Enter Password"
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
          />
        </div>
        <div className="form-group">
          <label className="phoneNumber" htmlFor="phone">
            Phone number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label className="role" htmlFor="role">
            Role
          </label>
          <select className="form-control" id="roleSelect">
            <option selected>Select a role</option>
            <option value="1">Student</option>
            <option value="2">Faculty</option>
          </select>
        </div>

        <button type="button" className="btn btn-primary">
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
