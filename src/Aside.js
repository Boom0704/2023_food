import React, { useState, useEffect } from 'react';
import "./css/Aside.css";

function LoginAside({ loginState, onLoginState }) {
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); // submit 기본 동작 방지
    const data = LoginCheck(id, password);
    onLoginState(data);
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
        <button className='signUp_btn'>회원가입</button>
    
      </form>
    </aside>
  );
}



function UserAside( {loginState, onLoginState} ) {
  
  const handleLogOut = (event) => {
    event.preventDefault(); // submit 기본 동작 방지
    onLoginState(false);
  }

  return (
        <aside>
        <h2>유저 정보</h2>
        <ul>
          <li>아이디: {loginState.userId}</li>
          <li>닉네임: {loginState.nickname}</li>
          <li>레벨: {loginState.level}</li>
          <li>포인트: {loginState.point}</li>
          <li>상세메시지: {loginState.status}</li>
        </ul>
        <button className='logout_btn' onClick={handleLogOut}>로그아웃</button>
        </aside>
    );
}

function Aside({loginState, onLoginState}) {
  return (
    <>
      {
      loginState == false ? <LoginAside loginState={loginState} onLoginState={onLoginState}/> : <UserAside loginState={loginState} onLoginState={onLoginState}/>
      }
    </>
  );
}

function LoginCheck(ID, password) {
  const data = [
    {
      ID : 0,
      userId : "a",
      nickname : "나 오목돈 몇달 ,, ㅠ ",
      password : "a",
      pic : 1200,
      status : "옷 사고 싶당",
      level : "Lv.1",
      point : "2300"
    },
    {
      ID : 1,
      userId : "장뚜방",
      nickname : "나 오목돈 몇달 ,, ㅠ ",
      password : "abc123",
      pic : 1200,
      status : "옷 사고 싶당",
      level : "Lv.1",
      point : "2500"
    }
  ];

  const userData = data.find((user) => user.userId === ID && user.password === password);
  
  if (userData) {
    // 로그인 성공
    return data.filter(x => x.userId === ID);
  } else {
    // 로그인 실패
    console.log('로그인 실패');
    return alert("실패");
  }
}

export default Aside;