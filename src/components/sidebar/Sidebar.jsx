import Navbar from '../navbar/Navbar';
import Chats from '../chats/Chats';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Chats />
    </div>
  );
};

export default Sidebar;
