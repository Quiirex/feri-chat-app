import More from '../../assets/more.png';
import Messages from '../messages/Messages';
import Input from '../input/Input';
import './Chat.scss';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Janez Novak</span>
        <div className="chatIcons">
          <img src={More} alt="" />
          {/* TODO replace with icon */}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
