import React, { useEffect, useState } from 'react';
import Message from '../message/Message';
import './Messages.scss';

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate fetching messages from Firebase
    const dummyMessages = [
      { id: '1', senderId: 'user1', text: 'Pozdravljen!', img: null },
      {
        id: '2',
        senderId: 'user1',
        text: 'Trenutno še ni mogoče pošiljati dejanskih sporočil.',
        img: null,
      },
      {
        id: '3',
        senderId: 'user1',
        text: 'Zato je to samo primer končnega izgleda.',
        img: null,
      },
      {
        id: '4',
        senderId: 'user2',
        text: 'Okej, kul!',
        img: null,
      },
    ];

    setMessages(dummyMessages);
  }, [chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} senderId={m.senderId} />
      ))}
    </div>
  );
};

export default Messages;
