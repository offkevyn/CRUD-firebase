import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, orderBy} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBm8T9D1McIMT_JP7oETPLoYx2AUhaKoL0",
  authDomain: "crud-firebase-4c03f.firebaseapp.com",
  projectId: "crud-firebase-4c03f",
  storageBucket: "crud-firebase-4c03f.appspot.com",
  messagingSenderId: "990733485147",
  appId: "1:990733485147:web:8ae42fef7f5df32580eb7e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const save = (nome, email) => {
 addDoc(collection(db, 'CRUD-firebase'), {nome, email});
}

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "CRUD-firebase"), callback);

export const getTasks = () => getDocs(collection(db, "CRUD-firebase"));