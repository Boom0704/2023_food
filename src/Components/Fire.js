import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


function Fire(collectionName) {
    const firebaseConfig = {
        apiKey: "AIzaSyAV9JnXgaaQIElUtx7Ry6l_vyg2E1coJbY",
        authDomain: "inyyfood.firebaseapp.com",
        databaseURL: "https://inyyfood-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "inyyfood",
        storageBucket: "inyyfood.appspot.com",
        messagingSenderId: "259706183908",
        appId: "1:259706183908:web:895fe866af586a4c8accf1",
        measurementId: "G-FQFGQCNZ5V"
      };
    
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
    
      const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, collectionName));
          const dataArr = querySnapshot.docs.map((doc) => doc.data());
          setData(dataArr);
        };
        fetchData();
      }, [collectionName]);
    
      return { data, db };
}
export default Fire;