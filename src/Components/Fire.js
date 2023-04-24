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
    
      const app = initializeApp(firebaseConfig);  // Firebase 초기화 
      const db = getFirestore(app);
    
      const [data, setData] = useState([]);
    
      useEffect(() => {  // 컬렉션에서 데이터를 가져오는 비동기 함수 실행 
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, collectionName));  // collectionName이 변경될 때마다 함수가 다시 실행됨 (애플리케이션이 렌더링될 때 컬렉션에서 데이터를 가져오고 데이터가 변경될 때마다 업데이트할 수 있다)
          const dataArr = querySnapshot.docs.map((doc) => doc.data());  // map으로 하나씩 데이터 가져오기 
          dataArr.sort((a, b) => b.id - a.id); // 내가 햇소 ()
          setData(dataArr);
        };
        fetchData();
      }, [collectionName]);
    
      return { data, db, setData };
}
export default Fire;