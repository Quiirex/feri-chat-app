import Navbar from '../navbar/Navbar';
import Chats from '../chats/Chats';
import Search from '../search/Search';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
