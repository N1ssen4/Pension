import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { User } from "../types/User";
import { db } from "../utils/database/server";

//Establish a connection to the database
const userCollectionRef = collection(db, "users");


//Add a new user to the user collection
export const createUser = async (newUser : User, pensureID : string) => {
    const firestoreUser = await addDoc(userCollectionRef, {...newUser, pensureID})
    localStorage.setItem("FirestoreID", firestoreUser.id)
}
//Update the user with the specified ID
export const updateUser = async (id : string, user: User) => {
    const userDoc = doc(db, "users", id)
    await updateDoc(userDoc,user)
}

