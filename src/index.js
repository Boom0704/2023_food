import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Header from './Components/Header';
import Aside from './Components/Aside';

function Root() {
  const [selectedPage, setSelectPage] = useState('Home');
  const [loginState, setLoginState] = useState(false);
  
  return (
    <BrowserRouter>  
      <Header setSelectPage={setSelectPage} />
      <Aside loginState={loginState} setLoginState={setLoginState} setSelectPage={setSelectPage} />  {/* 로그인 상태 변경 함수 */}
      <App selectedPage={selectedPage} setSelectPage={setSelectPage} loginState={loginState} setLoginState={setLoginState} /> {/* 페이지 이동 */}
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);