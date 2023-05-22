import { useContext } from 'react';
import Messages from '../messages/Messages';
import Input from '../input/Input';
import './Chat.scss';
import { ChatContext } from '@/context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
