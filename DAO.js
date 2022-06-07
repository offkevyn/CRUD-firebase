import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const save = fields => {
  fields.dt_create = serverTimestamp();
  console.log(fields)
 addDoc(collection(db, 'CRUD-firebase'), fields);
}

export const onGetTasks = (callback) => {
  const ref = query(collection(db, "CRUD-firebase"), orderBy("dt_create"));
  onSnapshot(ref, callback);
}

export const getTasks = () => getDocs(collection(db, "CRUD-firebase"));

export const deleteTask = (id) =>  deleteDoc(doc(db, "CRUD-firebase", id));

export const updateTask = (id, newFields) => updateDoc(doc(db, "CRUD-firebase", id), newFields);