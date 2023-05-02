import { useState } from "react";
import "./css/MyPage.css";
import Category from "./Category";
import Fire from "./Components/Fire";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import useFirebaseStorage from "./Components/useFirebaseStorage";
import img_1 from './img/1.jpeg';

function MyPage({setLoginState, loginState, setSelectPage}) {
  const {data, db} = Fire('User');
  const { uploadFile } = useFirebaseStorage(); 
  
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");


  const [pic, setPic] = useState(loginState.picture);
  const [file, setFile] = useState(null); // file을 저장할 공간

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const temp = e.target.files[0];
    setPic(URL.createObjectURL(temp));
  }

  const docRef = doc(db, 'User', loginState.id);

  const updateData = {
    password: loginState.password,
    nickname: loginState.nickname,
    status: loginState.status,
    picture: loginState.picture,
  };

  const handlePicChange = async (e) => {  // async -> await가 필요할 때 해당 func에 입력 (func이 아니어도 가능)
    e.preventDefault();
    let picture = await uploadFile(file);  // await -> 외부 프로그램이랑 통신할 때 (db 혹은 back-end server)
    updateData.picture = picture;
    await updateDoc(docRef, updateData);

    loginState.picture = picture;
    setLoginState(loginState);
    setSelectPage('Home');
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

  async function handleDeleteID() {  // 회원 탈퇴 
    const confirmChange = window.confirm("진짜 탈퇴할래용? ㅠㅠ");
    if (confirmChange) {
      await deleteDoc(doc(db, "User", loginState.id));
      setLoginState(false);
      setSelectPage('Home');
    }   
  }

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
          <img className='profile_img' src={pic} /><br/>
          <input type="file" accept="image/*" onChange={(e)=>handleFileChange(e)} />
          <button type="button" onClick={handlePicChange}>변경</button>
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
        <div>
          <button className="forbidden_btn" onClick={handleDeleteID}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  </>
  );
}

export default MyPage;

// 비밀번호, 닉네임 변경
