import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuSM5hDEYmXqStb4H5qZHyjc_kG7F6G-M",
  authDomain: "my-demo-app-eb22a.firebaseapp.com",
  projectId: "my-demo-app-eb22a",
  storageBucket: "my-demo-app-eb22a.appspot.com",
  messagingSenderId: "838463841389",
  appId: "1:838463841389:web:706e94a8c13c6a7ffc8b64",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
