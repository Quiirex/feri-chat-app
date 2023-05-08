import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      navigate('/');
    } catch (error) {
      setErrors(true);
    }
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
            {errors && <p className="error"> Invalid credentials </p>}
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
