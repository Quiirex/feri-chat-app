import React, { useState } from 'react';
import './Search.scss';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    // Simulate fetching data from Firebase
    const dummyData = [
      {
        uid: '1',
        displayName: 'Janez Novak',
        photoURL:
          'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
      },
      {
        uid: '2',
        displayName: 'Miha Slovenec',
        photoURL:
          'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
      },
      {
        uid: '3',
        displayName: 'Ana Hrvatica',
        photoURL:
          'https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg',
      },
    ];

    const foundUser = dummyData.find((data) => data.displayName === username);

    if (foundUser) {
      setUser(foundUser);
      setErr(false);
    } else {
      setUser(null);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // Simulate creating a chat in Firebase
    console.log(`Creating chat with ${user.displayName}`);
    setUser(null);
    setUsername('');
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search for a user..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setErr(false)}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
