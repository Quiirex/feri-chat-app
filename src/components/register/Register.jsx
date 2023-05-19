import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage, } from '@/services/firebase';

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Layout } from '../layout/Layout';
import * as Yup from 'yup';
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

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordAgain: Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return inputs.password === value;
      })
      .required('Password confirmation is required'),
    // photoURL: Yup.mixed().required('Profile picture is required'),
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setValidationErrors({ ...validationErrors, [name]: '' });
    } catch (error) {
      setValidationErrors({ ...validationErrors, [name]: error.message });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(inputs, { abortEarly: false });

      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      const file = e.target[5].files[0];
      
      const storageRef = ref(
        storage,
        `photoURLs/${registrationResult.user.uid}/${new Date().getTime()}`
      );

      await uploadBytesResumable(storageRef, file).then(() => {
        console.log('File uploaded!');
      })
      .catch((error) => {
        console.log(error);
      });

      try {
        await updateProfile(registrationResult.user, {
          displayName: inputs.firstname + ' ' + inputs.lastname,
          photoURL: inputs.photoURL,
        });

        await setDoc(doc(db, 'users', registrationResult.user.uid), {
          uid: registrationResult.user.uid,
          displayName: inputs.firstname + ' ' + inputs.lastname,
          firstname: inputs.firstname,
          lastname: inputs.lastname,
          email: inputs.email,
          photoURL: inputs.photoURL,
          role: 'Student',
        });

        await setDoc(doc(db, 'userChats', registrationResult.user.uid), {});
        navigate('/login');
      }
      catch (error) {
        alert(error.message, error.stack);
      }
    }
    catch (error) {
      const errors = {};
      console.log(error)
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
    }
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default Register;