import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, where, query, doc, updateDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


const getConfiguration = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: "samart-space",
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };
  return firebaseConfig;
}

function functionInitApp() {
  const fireBaseConfig = getConfiguration();
  console.log(fireBaseConfig);
  const app = initializeApp(fireBaseConfig, {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  });
  return app;
}

const app = functionInitApp();

const firebaseAuth = getAuth(app);


const firestore = getFirestore(app)


const  addDataToCollection = async (collectionName, data) => {

  try {
    const ref = collection(firestore, collectionName) 
    const docRef = await addDoc(ref, data);
    console.log(docRef.id);
    return docRef;
  } catch (err) {
    console.log("Error in adding new document", err)
  }
} 

const  getAllDataFromCollection = async (collectionName) => {

  try {
    const ref = collection(firestore, collectionName) 
    const docRef = await getDocs(ref);
    return docRef
  } catch (err) {
    console.log("Error in getting new document", err)
  }
  
} 

/**
 * 
 * @param {name of the collection} collectionName 
 * @param { It is in array of object with properties {propertyName, operation, value}} querys
 * @returns 
 */
const getByQuery = async (collectionName, querys) => {
  try {
    const ref = collection(firestore, collectionName) 

    const queryArray = [];
    querys.forEach((q) => {
      queryArray.push(where(`${q.propertyName}`, q.operation, q.value));
    })

    const myQuery = query(ref, ...queryArray);
    
    const docRef = await getDocs(myQuery);
    return docRef;
  } catch (err) {
    console.log("Error in getting document by query", err)
  }
}


/**
 * 
 * @param {Name of collection} collectionName 
 * @param {DocumentId that need to update} documentId 
 * @param {It is in form of object with key value pair} dataToUpdate 
 */
const updateSingleData = async (collectionName, documentId, dataToUpdate ) => {

  try {

    const singleUpdateQuery = doc(firestore, collectionName, documentId);
    const afterUpdate = await updateDoc(singleUpdateQuery, dataToUpdate)
  
  } catch (err) {
    console.log("error in updating single documet", err)
  }
 

}

export default {
  firebaseAuth,
  firestore,
  addDataToCollection,
  getAllDataFromCollection,
  getByQuery,
  updateSingleData
}

