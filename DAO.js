import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const save = (nome, email) => {
 addDoc(collection(db, 'CRUD-firebase'), {nome, email});
}

export const onGetTasks = (callback) => onSnapshot(collection(db, "CRUD-firebase"), callback);

export const getTasks = () => getDocs(collection(db, "CRUD-firebase"));

export const deleteTask = (id) =>  deleteDoc(doc(db, "CRUD-firebase", id));

export const updateTask = (id, newFields) => updateDoc(doc(db, "CRUD-firebase", id), newFields);