import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "@firebase/firestore";
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
export const firebaseAuth = getAuth(app);


export const firestore = getFirestore(app)


export const  addDataToCollection = async (collectionName, data) => {

  try {
    const ref = collection(firestore, collectionName) 
    const docRef = await addDoc(ref, data);
    console.log(docRef.id);
    return docRef;
  } catch (err) {
    console.log("Error in adding new document", err)
  }
} 

export const  getAllDataFromCollection = async (collectionName) => {

  try {
    const ref = collection(firestore, collectionName) 
    const docRef = await getDocs(ref);
    return docRef
  } catch (err) {
    console.log("Error in getting new document", err)
  }
  
} 