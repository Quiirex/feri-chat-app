const Login = () => {
    return (
        <div className="login">
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo"> FERI Chat </span>
                    <form>
                        <input className="email" placeholder="Email" type="email" />
                        <input className="password" placeholder="Password" type="password" />
                        <button className="loginButton">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;