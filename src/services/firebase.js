import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO move to .env
const firebaseConfig = {
  apiKey: 'AIzaSyAmO69IEyDoPVY1WYWG_1iceasVA7q_j2w',
  authDomain: 'ferichatapp.firebaseapp.com',
  projectId: 'ferichatapp',
  storageBucket: 'ferichatapp.appspot.com',
  messagingSenderId: '25456877507',
  appId: '1:25456877507:web:563c818275fdfd9bd5e776',
  measurementId: 'G-P34HYFXSTX',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
