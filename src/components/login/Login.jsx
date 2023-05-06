import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="login">
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo"> FERI Chat </span>
                    <form onSubmit={handleLogin}>
                        <input className="email" placeholder="Email" type="email" />
                        <input className="password" placeholder="Password" type="password" />
                        <button className="loginButton">Login</button>
                    </form>
                    <p> 
                        Don't have an account? <Link to="/register">Register</Link>
                     </p>
                </div>
            </div>
        </div>
    )
}

export default Login;