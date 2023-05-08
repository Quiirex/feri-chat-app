import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> FERI Chat </span>
          <form onSubmit={handleLogin}>
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
            <button className="loginButton">Login</button>
          </form>
          <p>
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
