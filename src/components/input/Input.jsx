import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../services/firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Img from '../../assets/img.png';
import EmojiPicker from 'emoji-picker-react';
import './Input.scss';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (urgentFlag) => {
    if (!text && !img) {
      return;
    }

    setShowEmojiPicker(false);

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      try {
        const snapshot = await uploadTask;

        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });

        setText('');
        setImg(null);
        inputRef.current.focus();
      } catch (error) {
        // Handle the error here
      }
    } else {
      setText('');
      setImg(null);

      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          urgent: urgentFlag,
        }),
      });
      inputRef.current.focus();
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
        senderId: currentUser.uid,
        urgent: urgentFlag,
        seen: true,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
        senderId: currentUser.uid,
        urgent: urgentFlag,
        seen: false,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
  };

  const clearInput = () => {
    setText('');
    setImg(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey && text) {
      const confirmation = window.confirm(
        'Do you want to send urgent message?'
      );
      if (confirmation) {
        handleSend(true);
        clearInput();
      }
    } else if (e.key === 'Enter' && text) {
      handleSend(false);
      clearInput();
    } else {
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Do you want to send urgent message?');
    if (confirmation) {
      handleSend(true);
    }
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
    inputRef.current.focus();
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        value={text}
        ref={inputRef}
      />
      <div className="send">
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={(e) => setImg(e.target.files[0])}
          accept="image/*"
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <div className="emoji-picker">
          {showEmojiPicker && (
            <EmojiPicker
              height={400}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
              onEmojiClick={(selectedEmoji, e) => {
                inputRef.current.focus();
                const emoji = String.fromCodePoint(
                  parseInt(selectedEmoji.unified, 16)
                );
                setText(text + emoji);
              }}
            />
          )}
        </div>
        <button onClick={handleEmojiClick}>&#128512;</button>

        <button
          onClick={() => handleSend(false)}
          onContextMenu={handleRightClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 mr-1.5">
            <path d="M2 22L13 11" />
            <path d="M2 22L9 2L13 11L22 15L2 22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Input;
