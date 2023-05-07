import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span className="logo">FERI Chat</span>
      <div className="user">
        <img
          src="https://wikibio.in/wp-content/uploads/2021/12/Hasbulla.jpg"
          alt="Avatar"
        />
        <span>User</span>
        <button onClick={() => navigate('/login')}>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;
