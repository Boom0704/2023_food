import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Header from './Components/Header';
import Aside from './Components/Aside';

function Root() {
  const [selectedPage, setSelectedPage] = useState('Korean');
  const [loginState, setLoginState] = useState(false);
  
  return (
    <BrowserRouter>
      <Header onSelectPage={setSelectedPage} />
      <Aside loginState={loginState} onLoginState={setLoginState} onSelectPage={setSelectedPage} />  {/* 로그인 상태 변경 함수 */}
      <App selectedPage={selectedPage} onSelectPage={setSelectedPage} /> {/* 페이지 이동 */}
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);