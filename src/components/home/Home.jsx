import './Home.scss';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import { Layout } from '../layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="home">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
