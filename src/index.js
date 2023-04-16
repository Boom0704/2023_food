import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Header from './Header';
import Aside from './Aside';

function Root() {
  const [selectedPage, setSelectedPage] = useState('Korean');
  const [loginState, setLoginState] = useState(false);
  
  return (
    <BrowserRouter>
      <Header onSelectPage={setSelectedPage} />
      <Aside loginState={loginState} onLoginState={setLoginState} />  {/* 로그인 상태 변경 함수 */}
      <App selectedPage={selectedPage} />
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);