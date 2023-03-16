import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJwVqGRRZeGWMyOLaFV-QzMz2VUJaP_78",
  authDomain: "ratinov-clinic-401b0.firebaseapp.com",
  projectId: "ratinov-clinic-401b0",
  storageBucket: "ratinov-clinic-401b0.appspot.com",
  messagingSenderId: "150132533358",
  appId: "1:150132533358:web:00559ebafa39dabaa4de7f",
  measurementId: "G-XS7FSK6P1Y",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const login = async (e, p) => {
  await signInWithEmailAndPassword(auth, e, p);
};

export const logout = () => signOut(auth);

export const usersRef = collection(db, "users");
