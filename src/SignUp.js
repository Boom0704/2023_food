import { useState } from "react";
import "./css/SignUp.css";
import Fire from "./Components/Fire";
import { addDoc, collection } from 'firebase/firestore';

function SignUp( {foodType, onSelectPage} ) {

  const { data, db } = Fire("User");

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");


  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const level = 1;
    const picture = "사진 주소";
    const id = now.getTime().toString();  
    const point = 0; 

    if ( userID === "" || password === "" || nickname === "" || confirm === "") {
      alert("모두 입력해주세용."); 
    } else if (password !== confirm) {
      alert("비밀번호가 안 맞아요!!!");
    } else {
      try {
        await addDoc(collection(db, 'User'), { id, level, nickname, password, picture, point, status, userID });
        onSelectPage("Home");
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
            <input type="file" />
            <button type="submit" className="signUp_ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }
  

  export default SignUp;
  