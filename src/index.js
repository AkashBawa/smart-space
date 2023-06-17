
// import  { initializeApp } from "firebase/app";
// import "firebase/firestore";
// import {getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

const getFirestoreData = async () => {
    db.collection('users').get().then((querySnapshot) => {
        querySnapshot.docs.map(doc => {
            console.log(doc.data());
            return doc.data();
            });
    }).catch(err => {
        console.log(err)
    })

}

getFirestoreData()