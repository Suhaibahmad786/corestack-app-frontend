import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfIWPrw1ITMo8PDz7Xexd5gAtP07DA124",
  authDomain: "corestack-app.firebaseapp.com",
  projectId: "corestack-app",
  storageBucket: "corestack-app.firebasestorage.app",
  messagingSenderId: "394154782925",
  appId: "1:394154782925:web:5b6103f4ceae5f2af3b984",
   measurementId: "G-2GHGNWFDSX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };