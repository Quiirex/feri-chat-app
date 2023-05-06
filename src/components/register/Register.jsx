import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="register">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> FERI Chat </span>
          <form onSubmit={handleRegister}>
            <input
              className="firstname"
              name="firstname"
              value={inputs.firstname}
              onChange={handleChange}
              placeholder="First name"
              type="text"
            />
            <input
              className="lastname"
              name="lastname"
              value={inputs.lastname}
              onChange={handleChange}
              placeholder="Last name"
              type="text"
            />
            <input
              className="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            <input
              className="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />
            <input
              className="passwordAgain"
              name="passwordAgain"
              value={inputs.passwordAgain}
              onChange={handleChange}
              placeholder="Repeat Password"
              type="password"
            />
            <button className="registerButton">Register</button>
          </form>
          <p>
            Already have an account?{' '}
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
