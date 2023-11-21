import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase'; // Ensure this path is correct

const addTodo = async (todo) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), { todo });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default addTodo;
