import React from 'react';
import "./css/Aside.css";


function LoginAside( ) {
  return (
    <aside>
      <h2>로그인</h2>
      <form>
        <label>
          아이디
          <input type="text" name="username" placeholder='ID'/>
        </label>
        <br />
        <label>
          비밀번호
          <input type="password" name="password" placeholder='Password'/>
        </label>
        <br />
        <button className='login_btn' type="submit">로그인</button>
        <button className='signUp_btn'>회원가입</button>
    
      </form>
    </aside>
  );
}

function UserAside() {
  return (
    <aside>
      <h2>유저 정보</h2>
      <ul>
        <li>아이디: john1234</li>
        <li>닉네임: John Doe</li>
        <li>레벨: 3</li>
        <li>포인트: 5000</li>
        <li>상세메시지: Hello, chicken 😕!</li>
      </ul>
      <button className='logout_btn'>로그아웃</button>
    </aside>
  );
}

function Aside(변수, 함수) {
  return (
    <>
      {
      변수==false ? <UserAside /> : <LoginAside />
      }
    </>
  );
}

function LoginCheck({ID, password}) {
  const data = [
    {ID: false},
    {
      ID : 0,
      userId : "박땅니",
      nickname : "나 오목돈 몇달 ,, ㅠ ",
      password : "abc123",
      pic : 1200,
      status : "옷 사고 싶당",
      level : "Lv.1",
      point : "2300 point"
    },
    {
      ID : 1,
      userId : "장뚜방",
      nickname : "나 오목돈 몇달 ,, ㅠ ",
      password : "abc123",
      pic : 1200,
      status : "옷 사고 싶당",
      level : "Lv.1",
      point : "2300 point"
    }
  ]
}

export default Aside;