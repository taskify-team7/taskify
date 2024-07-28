import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export let firebaseApp: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENTER_ID,
  appId: process.env.REACT_APP_ID,
};

try {
  firebaseApp = getApp("app");
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export default firebase;
