import React, { useEffect, useRef } from 'react';
import './Message.scss';

const Message = ({ message, currentUser, senderId }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${senderId == 'user2' && 'owner'}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === 'user2'
              ? 'https://wikibio.in/wp-content/uploads/2021/12/Hasbulla.jpg'
              : 'https://media.licdn.com/dms/image/C4D03AQGIScwFoM74YQ/profile-displayphoto-shrink_800_800/0/1523881590135?e=2147483647&v=beta&t=JC8yYa1iTGen_uPSkIh-T7mNAZISmGr8il3hqe_wln8'
          }
          alt="Avatar"
        />
        <span>just now</span>
        {/* Tukaj kasneje dodamo dejanski čas pošiljanja sporočila */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
