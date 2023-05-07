import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

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
            <input className="firstname" placeholder="First name" type="text" />
            <input className="lastname" placeholder="Last name" type="text" />
            <input className="email" placeholder="Email" type="email" />
            <input
              className="password"
              placeholder="Password"
              type="password"
            />
            <input
              className="passwordAgain"
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
