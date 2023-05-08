import { useState } from "react";
import "./css/SignUp.css";
import Fire from "./Components/Fire";
import { setDoc, doc } from 'firebase/firestore';
import useFirebaseStorage from "./Components/useFirebaseStorage";

function SignUp( {foodType, setSelectPage} ) {
  const { uploadFile } = useFirebaseStorage(); // useFirebaseStorage를 불러옴 
  const { data, db, setData } = Fire("User");  
  // data: 우리가 사용하는 데이터 배열 (지금까지 만든 거 가져옴)
  // db: Firebase 생성, 변경, 삭제
  // setData: data 변경 함수, 쓰는 이유 -> 파베에서 db 변화에 대한 최신화를 data에게 해줌 

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");

  const [file, setFile] = useState(""); // 이미지 경로 불러옴 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    let picture = "https://firebasestorage.googleapis.com/v0/b/inyyfood.appspot.com/o/images%2Fbasic.jpg?alt=media&token=5af8e39f-1555-41d9-80fd-92d283f61e24";
    const id = now.getTime().toString();  
    const isAdmin = false;  // 관리자 

    if ( userID === "" || password === "" || nickname === "" || confirm === "") {
      alert("모두 입력해주세용."); 
    } else if (data.filter((x) => x.userID === userID).length !== 0) {  // ID 중복 방지 
      alert("이미 존재하는 ID래! 이건 못해 ㅠㅠ");
    } else if (data.filter((x) => x.nickname === nickname).length !== 0) {  // 닉네임 중복 방지 
      alert("이미 존재하는 닉네임이래! 이건 못해");
    } else if (password !== confirm) {
      alert("비밀번호가 안 맞아요!!!");
    } else {
      try {
        if (file) {
          picture = await uploadFile(file);
        }
        await setDoc(doc(db, 'User', id), { id, nickname, password, picture, status, userID, isAdmin });
        setSelectPage("Home");
      } catch (error) {
        console.error(error);
        alert("올리기 실패 : " + error);
      }
    }
  }

    return (
      <div className="Writing">
        <form onSubmit={handleSignUpSubmit}>
          <label className="title">
            ID
            <input type="text" className="user_ID" placeholder='ID' onChange={(event) => setUserID(event.target.value)} />
          </label>
          <br />
          <label className="title">
            PW
            <input type="password" className="user_PW" placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <label className="title">
            Confirm PW
            <input type="password" className="confirm_PW" placeholder='Confirm Password' onChange={(event) => setConfirm(event.target.value)} />
          </label>
          <br />
          <label className="title">
            Nickname
            <input type="text" className="user_nickname" placeholder='Your Nickname' onChange={(event) => setNickname(event.target.value)} />
          </label>
          <br />
          <label className="title">
            Status
            <textarea className="user_status" onChange={(event) => setStatus(event.target.value)}/>
          </label>
          <br />
            <input type="file" accept="image/*" onChange={(event) => handleFileChange(event)}/> 
            <button type="submit" className="signUp_ok_btn">OK</button> 
          <br />
        </form>
      </div>
    );
  }
  

  export default SignUp;
  