import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/database/server";

//Establish a connection to the database
const pensionCollectionRef = collection(db, "pension");

//Add new pensionInfo to the pensioninfo collection
export const createPensionInfo = async (id: string, pensionInfo: any[]) => {
await setDoc(doc(db, "pension", id), {...pensionInfo})};

export const getPensionInfo = async (id: string) => {
    const docRef = doc(db, "pension", id)
    const info = await getDoc(docRef)
    if (info.exists()){
        console.log(info.data)
    }
    console.log("No pension data found")
}