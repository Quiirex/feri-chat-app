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
  const [progress, setProgress] = useState(0);
  const [usedEmail, setUsedEmail] = useState(false);

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
    photoURL: Yup.mixed(),
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

  const isImageFile = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    return file && acceptedImageTypes.includes(file.type);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setUsedEmail(false);

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

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Add a listener for upload progress
      uploadTask.on('state_changed', (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Update the loader with the current progress percentage
        setProgress(progress);
      });

      await uploadTask;

      const photoURL = await getDownloadURL(storageRef);
      inputs.photoURL = photoURL;

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
      } catch (error) {
        alert(error.message, error.stack);
      }
    } catch (error) {
      const errors = {};
      if (error.code === 'auth/email-already-in-use') {
        setUsedEmail(true);
      }
      (error.inner || []).forEach((err) => {
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
              <div className="error text-center">
                {validationErrors.firstname}
              </div>
              <input
                className="lastname"
                name="lastname"
                value={inputs.lastname}
                onChange={handleChange}
                placeholder="Last name"
                type="text"
              />
              <div className="error text-center">
                {validationErrors.lastname}
              </div>
              <input
                className="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
              <div className="error text-center">{validationErrors.email}</div>
              <input
                className="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
              <div className="error text-center">
                {validationErrors.password}
              </div>
              <input
                className="passwordAgain"
                name="passwordAgain"
                value={inputs.passwordAgain}
                onChange={handleChange}
                placeholder="Repeat Password"
                type="password"
              />
              <div className="error text-center">
                {validationErrors.passwordAgain}
              </div>
              <input
                // required
                className="file-input"
                name="photoURL"
                value={inputs.photoURL}
                onChange={handleChange}
                type="file"
                id="file"
                accept="image/*"
              />
              <div className="error text-center">
                {validationErrors.photoURL}
              </div>
              <div className="text-center">
                {progress > 0 && (
                  <div>
                    <progress
                      className="progress"
                      value={progress}
                      max="100"></progress>
                    <p>Loading...{progress.toFixed(2)}%</p>
                  </div>
                )}
              </div>
              {usedEmail && (
                <div className="error text-center">Email already in use!</div>
              )}
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
