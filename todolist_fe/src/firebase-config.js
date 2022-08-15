import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" 

const firebaseConfig = {
  apiKey: "AIzaSyD1Y469C9eyeeFL59Gs-wWNP-LLjZRZYFo",
  authDomain: "todolist-614db.firebaseapp.com",
  projectId: "todolist-614db",
  storageBucket: "todolist-614db.appspot.com",
  messagingSenderId: "436480268504",
  appId: "1:436480268504:web:db5ac428ce3943c7019fad",
  measurementId: "G-K82WLPFNQ3"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
