import React, { useState } from 'react';
import "../css/Aside.css";
import SignUp from '../SignUp';
import Fire from './Fire';
import MyPage from '../MyPage';
import Modal from './Modal';

function LoginAside({ setLoginState, setSelectPage }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { data, db } = Fire('User');

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      const userData = data.find((user) => user.userID === id && user.password === password);
      
      if (userData == undefined) {
        alert("아이디와 비번 확인");
      } else {
        setLoginState(userData);
      }
      
    } catch (error) {
      console.log('로그인 실패ss');
      alert('로그인에 실패했습니다.');
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    setSelectPage("SignUp");
  }

  return (
    <aside>
      <h2 className='loginInfo'>로그인</h2>
      <form>
        <label className='userInfo'>
          아이디
          <input type="text" name="username" placeholder='ID' value={id} onChange={(event) => setId(event.target.value)} />
        </label>
        <br />
        <label className='userInfo'>
          비밀번호
          <input type="password" name="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button className='login_btn' onClick={handleLogin}>로그인</button>
        <button className='signUp_btn' onClick={handleSignUp}>회원가입</button>
      </form>
    </aside>
  );
}


function UserAside( {loginState, setLoginState, setSelectPage} ) {
  const handleLogOut = (event) => {
    event.preventDefault();
    setLoginState(false);
  }

  const handleMyPage = (event) => {
    event.preventDefault();
    setSelectPage('MyPage');
  }

  const [isOpen, setIsOpen] = useState(false);  // Modal 창 열고 닫기 

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }


  return (
    <aside>
      <h2 className='loginInfo'>유저 정보</h2>
      <ul>
        <li className='userInfo'>아이디: {loginState.userID}</li> <br/>
        <li className='userInfo'>닉네임: {loginState.nickname}</li> <br/>
        <li className='userInfo'>레벨: {loginState.level}</li> <br/>
        <li className='userInfo'>포인트: {loginState.point}</li> <br/>
        <li className='userInfo'>상세메시지: {loginState.status}</li>
      </ul>
      <button className='logout_btn' onClick={handleLogOut}>로그아웃</button>
      <button className='mypage_btn' onClick={handleMyPage}>마이페이지</button>
      {(loginState.isAdmin === true) 
      ? <button className='forbidden_btn' onClick={handleOpenModal}>금지 단어</button> 
      : <></> }
      {isOpen && <Modal handleCloseModal = {handleCloseModal} />}
    </aside>  
  );
}

function Aside({loginState, setLoginState, setSelectPage}) {
  return (
    <>
      {loginState == false ? (
        <LoginAside setLoginState={setLoginState} setSelectPage={setSelectPage} />
      ) : (
        <UserAside loginState={loginState} setLoginState={setLoginState} setSelectPage={setSelectPage} />
      )}
    </>
  );
}

export default Aside;