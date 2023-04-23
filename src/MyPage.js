import { useState } from "react";
import "./css/MyPage.css";
import Category from "./Category";
import Fire from "./Components/Fire";
import { doc, updateDoc } from 'firebase/firestore';
import img_1 from './img/1.jpeg';

function MyPage({setLoginState, loginState, setSelectPage}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");

  const {data, db} = Fire('User');

  const docRef = doc(db, 'User', loginState.id);

  const updateData = {
    password: loginState.password,
    nickname: loginState.nickname,
    status: loginState.status,
    picture: loginState.picture,
  };


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password === "" || confirm === "") {
      alert("모두 입력해주세용.");
    } else if (password !== confirm) {
      alert("비밀번호가 안 맞아요!!!");
    } else {
      updateData.password = password;
      await updateDoc(docRef, updateData);
      loginState.password = password;
      setLoginState(loginState);
      setSelectPage('Home');
    }
  };

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    if (nickname === "") {
      alert("변경할 닉네임을 입력해주세용!");
    } else {
      const confirmChange = window.confirm("변경할래용?");
      if (confirmChange) {
          updateData.nickname = nickname;
          await updateDoc(docRef, updateData);

          loginState.nickname = nickname;
          setLoginState(loginState);
          setSelectPage('Home');
      }
    }
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    if (status === "") {
      alert("변경할 상태 메시지를 입력해주세용!");
    } else {
      const confirmChange = window.confirm("변경할래용?");
      if (confirmChange) {
        updateData.status = status;
        await updateDoc(docRef, updateData);
        loginState.status = status;
        setLoginState(loginState);
        setSelectPage('Home');
      }
    }
  };

  return (
    <>
      <div className="MyPage">
        <div className="UserInfo">
          <div className="UserInfo_Item">
            <span className="Item_Label">ID: </span>
            <span className="Item_Value">{loginState.userID}</span>
          </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Picture: </span>
          <img className='user_profile_img' src={img_1} />
          <input type="file" accept="image/*" />
          <button type="button" onClick={handleNicknameChange}>변경</button>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Password: </span>
          <input type="password" className="Item_Value" onChange={(event) => setPassword(event.target.value)} />
          <input type="password" className="Item_Value" onChange={(event) => setConfirm(event.target.value)} />
          <button type="button" onClick={handlePasswordChange}>변경</button>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Nickname: </span>
          <span className="Item_Value">{loginState.nickname}</span>
          <input type="text" className="Item_Value" onChange={(event) => setNickname(event.target.value)} />
          <button type="button" onClick={handleNicknameChange}>변경</button>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Status: </span>
          <span className="Item_Value">{loginState.status}</span>
          <textarea className="Item_Value" onChange={(event) => setStatus(event.target.value)}></textarea>
          <button type="button" onClick={handleStatusChange}>변경</button>
        </div>
      </div>
    </div>
  </>
  );
}

export default MyPage;

// 비밀번호, 닉네임 변경

