import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyAiZbyM1FXW7SoPDP7N3m36LKgTdf4BCEQ",
//     authDomain: "realtime-rpi-data.firebaseapp.com",
//     databaseURL: "https://realtime-rpi-data-default-rtdb.firebaseio.com",
//     projectId: "realtime-rpi-data",
//     storageBucket: "realtime-rpi-data.appspot.com",
//     messagingSenderId: "948433917930",
//     appId: "1:948433917930:web:48174073956e0a34228493"
// };
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);