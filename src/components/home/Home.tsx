import './Home.scss';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
