import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-_0fkGDlCVEoxg0rlAptBYx9IuzFUZhM",
  authDomain: "zenith-9d6c9.firebaseapp.com",
  projectId: "zenith-9d6c9",
  storageBucket: "zenith-9d6c9.firebasestorage.app",
  messagingSenderId: "710879559300",
  appId: "1:710879559300:web:fea456281f193cdde50cd1",
  measurementId: "G-79JP4D9G6E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
