import React, { useContext, useState } from 'react';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, storage } from '@/services/firebase';
import { AuthContext } from '@/context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './Navbar.scss';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        setUploading(true);

        // Create a reference to the file in Firebase storage
        const storageRef = ref(storage, `${currentUser.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe the upload progress if needed
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            console.error('Error uploading profile photo:', error);
            setUploading(false);
          },
          async () => {
            // When the upload is complete, get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update the user's profile photo URL in Firebase authentication
            await updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });

            currentUser.photoURL = downloadURL;

            setUploading(false);
          }
        );
      } catch (error) {
        console.error('Error uploading profile photo:', error);
        setUploading(false);
      }
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successful sign out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="navbar">
      <div className="user">
        <label htmlFor="profile-image">
          <img src={currentUser.photoURL} alt="avatar" />
        </label>
        <span>{currentUser.displayName}</span>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className="user">
        <button onClick={handleSignOut} title="Log out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out h-4 w-4"
            id="showlogout">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
