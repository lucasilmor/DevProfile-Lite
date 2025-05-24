import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBwFpP8Pwg2qiAcdD_20wTjc0TY5bCzlT4",
  authDomain: "devprofilelite.firebaseapp.com",
  projectId: "devprofilelite",
  storageBucket: "devprofilelite.firebasestorage.app",
  messagingSenderId: "804603156901",
  appId: "1:804603156901:web:f1248ab30e55563f37f04c"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
