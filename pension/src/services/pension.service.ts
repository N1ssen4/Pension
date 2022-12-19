import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/database/server";

//Add new pensionInfo to the pensioninfo collection
export const createPensionInfo = async (id: string, pensionInfo: any[]) => {
  await setDoc(doc(db, "pension", id), { ...pensionInfo });
};

//Fetch pension information with the specified id 
export const getPensionInfo = async (id: string) => {
  const docRef = doc(db, "pension", id);
  const info = await getDoc(docRef);
  if (info.exists()) {
    return JSON.stringify(info.data())
  } else {
    console.log("No pension data found");
  }
};
