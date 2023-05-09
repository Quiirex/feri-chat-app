import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '@/services/firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordAgain: '',
    photoURL: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      // const storageRef = ref(
      //   storage,
      //   `photoURLs/${registrationResult.user.uid}/${new Date().getTime()}`
      // );

      // const file = e.target[5].files[0];

      // await uploadBytesResumable(storageRef, file).then(() => {
      //   getDownloadURL(storageRef).then(async (url) => {
      try {
        await updateProfile(registrationResult.user, {
          displayName: inputs.firstname + ' ' + inputs.lastname,
          photoURL: 'https://static.thenounproject.com/png/363640-200.png',
        });

        await setDoc(doc(db, 'users', registrationResult.user.uid), {
          uid: registrationResult.user.uid,
          displayName: inputs.firstname + ' ' + inputs.lastname,
          firstname: inputs.firstname,
          lastname: inputs.lastname,
          email: inputs.email,
          photoURL: 'https://static.thenounproject.com/png/363640-200.png',
          role: 'Student',
        });

        await setDoc(doc(db, 'userChats', registrationResult.user.uid), {});

        navigate('/login');
      } catch (error) {
        alert(error.message, error.stack);
      }
      //   });
      // });
    } catch (error) {
      alert(error.message, error.stack);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo"> FERI Chat </span>
          <form onSubmit={handleRegister}>
            <input
              className="firstname"
              name="firstname"
              value={inputs.firstname}
              onChange={handleChange}
              placeholder="First name"
              type="text"
            />
            <input
              className="lastname"
              name="lastname"
              value={inputs.lastname}
              onChange={handleChange}
              placeholder="Last name"
              type="text"
            />
            <input
              className="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            <input
              className="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />
            <input
              className="passwordAgain"
              name="passwordAgain"
              value={inputs.passwordAgain}
              onChange={handleChange}
              placeholder="Repeat Password"
              type="password"
            />
            <input
              // required
              className="file-input"
              name="photoURL"
              value={inputs.photoURL}
              onChange={handleChange}
              type="file"
              id="file"
            />
            <button className="registerButton">Register</button>
          </form>
          <p>
            Already have an account?{' '}
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
