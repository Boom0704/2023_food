import React, { useState } from 'react';
import "./css/Aside.css";
import SignUp from './SignUp';
import Fire from './Fire';

function LoginAside({ onLoginState, onSelectPage }) {
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
        onLoginState(userData);
      }
      
    } catch (error) {
      console.log('로그인 실패ss');
      alert('로그인에 실패했습니다.');
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    onSelectPage("SignUp");
  }

  return (
    <aside>
      <h2>로그인</h2>
      <form>
        <label>
          아이디
          <input type="text" name="username" placeholder='ID' value={id} onChange={(event) => setId(event.target.value)} />
        </label>
        <br />
        <label>
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


function UserAside( {loginState, onLoginState} ) {
  const handleLogOut = (event) => {
    event.preventDefault();
    onLoginState(false);
  }

  return (
    <aside>
      <h2>유저 정보</h2>
      <ul>
        <li>아이디: {loginState.userID}</li> <br/>
        <li>닉네임: {loginState.nickname}</li> <br/>
        <li>레벨: {loginState.level}</li> <br/>
        <li>포인트: {loginState.point}</li> <br/>
        <li>상세메시지: {loginState.status}</li>
      </ul>
      <button className='logout_btn' onClick={handleLogOut}>로그아웃</button>
    </aside>
  );
}

function Aside({loginState, onLoginState, onSelectPage}) {
  return (
    <>
      {loginState == false ? (
        <LoginAside onLoginState={onLoginState} onSelectPage={onSelectPage} />
      ) : (
        <UserAside loginState={loginState} onLoginState={onLoginState} />
      )}
    </>
  );
}

export default Aside;