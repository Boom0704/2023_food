import { useState } from "react";
import "./css/MyPage.css";
import Category from "./Category";

function MyPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password === "" || confirm === "") {
      alert("모두 입력해주세용.");
    } else if (password !== confirm) {
      alert("비밀번호가 안 맞아요!!!");
    } else {
      // change password logic here
    }
  };

  const handleNicknameChange = (e) => {
    e.preventDefault();
    if (nickname === "") {
      alert("변경할 닉네임을 입력해주세용!");
    } else {
      const confirmChange = window.confirm("변경할래용?");
      if (confirmChange) {
        // change nickname logic here
      }
    }
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    if (status === "") {
      alert("변경할 상태 메시지를 입력해주세용!");
    } else {
      const confirmChange = window.confirm("변경할래용?");
      if (confirmChange) {
        // change status logic here
      }
    }
  };

  return (
<div className="MyPage">
      <div className="UserInfo">
        <div className="UserInfo_Item">
          <span className="Item_Label">ID: </span>
          <span className="Item_Value">[유저 아이디]</span>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Password: </span>
          <input type="password" className="Item_Value" onChange={(event) => setPassword(event.target.value)} />
          <input type="password" className="Item_Value" onChange={(event) => setConfirm(event.target.value)} />
          <button type="button" onClick={handlePasswordChange}>변경</button>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Nickname: </span>
          <span className="Item_Value">{nickname}</span>
          <input type="text" className="Item_Value" onChange={(event) => setNickname(event.target.value)} />
          <button type="button" onClick={handleNicknameChange}>변경</button>
        </div>
        <div className="UserInfo_Item">
          <span className="Item_Label">Status: </span>
          <span className="Item_Value">{status}</span>
          <textarea className="Item_Value" onChange={(event) => setStatus(event.target.value)}></textarea>
          <button type="button" onClick={handleStatusChange}>변경</button>
        </div>
      </div><Category />
    </div>
  );
}

export default MyPage;

// 비밀번호, 닉네임 변경

