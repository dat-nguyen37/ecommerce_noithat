import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsEThGx3sz3-kfWbjSY3l0nSzg_JTO2Ps",
  authDomain: "imageupload-a6efc.firebaseapp.com",
  projectId: "imageupload-a6efc",
  storageBucket: "imageupload-a6efc.appspot.com",
  messagingSenderId: "214007906498",
  appId: "1:214007906498:web:0803ce76c5136276367b5b"
};


const app = initializeApp(firebaseConfig);
export const imgDb=getStorage(app) 