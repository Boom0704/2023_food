import React from 'react';
import "./css/Aside.css";


function LoginAside() {
  return (
    <aside>
      <h2>로그인</h2>
      <form>
        <label>
          아이디
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          비밀번호
          <input type="password" name="password" />
        </label>
        <br />
        <button className='login_btn' type="submit">로그인</button>
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
    </aside>
  );
}

function Aside({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? <UserAside /> : <LoginAside />}
    </>
  );
}

export default Aside;