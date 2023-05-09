import React, { useContext } from 'react';
import More from '../../assets/more.png';
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
