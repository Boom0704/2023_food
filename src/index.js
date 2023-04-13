import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Header from './Header';
import Aside from './Aside';

function Root() {
  const [selectedPage, setSelectedPage] = useState('Korean');

  return (
    <BrowserRouter>
      <Header onSelectPage={setSelectedPage} />
      <Aside />
      <App selectedPage={selectedPage} />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);