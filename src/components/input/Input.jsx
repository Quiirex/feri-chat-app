import React, { useState } from 'react';
import Img from '../../assets/img.png';
import './Input.scss';

const Input = ({ handleSend }) => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSendClick = async () => {
    // await handleSend(text, img);
    alert('Pošiljanje sporočil ni podprto v tej verziji aplikacije.');
    setText('');
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default Input;
