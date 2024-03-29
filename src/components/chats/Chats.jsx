import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../services/firebase';
import './Chats.scss';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
        if (doc.exists()) {
          const data = doc.data();
          const newMessageArrived = Object.values(data).some(
            (chat) => !chat.lastMessage?.seen
          );
          if (newMessageArrived) {
            console.log('New message arrived');
            new Notification('FERI chat', {
              body: 'New message',
            });
          }
        }
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = async (u, chatId) => {
    dispatch({ type: 'CHANGE_USER', payload: u });

    const chatDocRef = doc(db, 'userChats', currentUser.uid);
    await updateDoc(chatDocRef, {
      [`${chatId}.lastMessage.seen`]: true,
    });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const isUnseen = !chat[1].lastMessage?.seen;
          const isUrgent = chat[1].lastMessage?.urgent;
          const userChatClass = `userChat ${isUnseen ? 'unseen' : ''}`;
          const messageClass = `message ${isUrgent ? 'urgent' : ''}`;

          return (
            <div
              className={userChatClass}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo, chat[0])}>
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p className={messageClass}>
                  {chat[1].lastMessage?.senderId === currentUser.uid && 'You: '}
                  {chat[1].lastMessage?.text?.length > 25
                    ? chat[1].lastMessage?.text.slice(0, 25) + '...'
                    : chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
