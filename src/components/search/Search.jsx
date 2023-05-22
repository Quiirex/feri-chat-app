import React, { useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import { AuthContext } from '@/context/AuthContext';
import './Search.scss';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    if (username === '') {
      setUser(null);
      setErr(false);
      return;
    }

    const names = username.trim().split(' ');
    const firstName = names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : '';

    let q;
    let matchingUsers = [];

    if (lastName !== '') {
      // Search by last name
      q = query(
        collection(db, 'users'),
        where('displayName', '>=', lastName),
        where('displayName', '<=', lastName + '\uf8ff')
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const userFirstName = user.displayName.split(' ')[0].toLowerCase();
          if (
            userFirstName.includes(firstName.toLowerCase()) ||
            user.displayName.toLowerCase().includes(firstName.toLowerCase())
          ) {
            matchingUsers.push(user);
          }
        });

        if (matchingUsers.length > 0) {
          setErr(false);
        } else {
          setErr(true);
        }
      } catch (err) {
        setErr(true);
      }
    }

    if (matchingUsers.length === 0) {
      // Search by first name
      q = query(
        collection(db, 'users'),
        where('displayName', '>=', firstName),
        where('displayName', '<=', firstName + '\uf8ff')
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.displayName.toLowerCase().includes(lastName.toLowerCase())) {
            matchingUsers.push(user);
          }
        });

        if (matchingUsers.length > 0) {
          setErr(false);
        } else {
          setErr(true);
        }
      } catch (err) {
        setErr(true);
      }
    }

    if (matchingUsers.length > 0) {
      setUser(matchingUsers[0]);
    } else {
      setUser(null);
    }
  };

  const handleKey = (e) => {
    setUsername(e.target.value);
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername('');
  };

  useEffect(() => {
    handleSearch();
  }, [username]);

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search for a user..."
          onChange={handleKey}
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
