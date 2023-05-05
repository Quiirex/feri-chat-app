import './App.scss';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';

function App() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
