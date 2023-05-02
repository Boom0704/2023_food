import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

function useFirebaseStorage() {
  const [storage, setStorage] = useState(null);

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

  useEffect(() => {
    const app = initializeApp(firebaseConfig);  // firebase 시작 (초기화)
    const storage = getStorage(app);  // ex) a = 13; (storage 변수 사용)

    setStorage(storage);
  }, []);

  const uploadFile = async (file) => {
    if (!storage) return;  // Singleton pattern 

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {  // 하나의 비동기 (비동기의 흐름)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // 업로드 중일 때의 상태 변화 처리
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", url);
            resolve(url);
          });
        }
      );
    });
  };

  return {
    uploadFile,
  };
}

export default useFirebaseStorage;