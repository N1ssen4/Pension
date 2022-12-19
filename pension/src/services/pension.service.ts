import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/database/server";

//Establish a connection to the database
const pensionCollectionRef = collection(db, "pension");

//Add new pensionInfo to the pensioninfo collection
export const createPensionInfo = async (id: string, pensionInfo: any[]) => {
  await addDoc(pensionCollectionRef, {id, ...pensionInfo});
};
