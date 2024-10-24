import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("write to db ", err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
  } catch (err) {
    console.log("delete from db ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(database, collectionName, docSnapshot.id));
    });
  } catch (err) {
    console.log("delete all from db ", err);
  }
}

export async function addWarningToGoal(goalId, warningStatus) {
  try {
    const goalRef = doc(database, "goals", goalId);
    await updateDoc(goalRef, { warning: warningStatus });
    console.log("warning added to goal with ID:", goalId, "warning Status:", warningStatus);
  } catch (err) {
    console.log("add warning to goal ", err);
  }
}

export async function fetchGoalData(goalId) {
  try {
    const goalRef = doc(database, 'goals', goalId);
    const goalSnapshot = await getDoc(goalRef);

    if (goalSnapshot.exists()) {
      return goalSnapshot.data();
    } else {
      console.error('Goal does not exist!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching goal data:', error);
    throw error;
  }
}

export async function readAllDocs(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnap) => {
        data.push(docSnap.data());
      });
    }
    return data;
  } catch (err) {
    console.log("read all docs ", err);
  }
}