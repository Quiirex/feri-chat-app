const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">FERI Chat App</span>
      <div className="user">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="Avatar"
        />
        <span>User</span>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;
