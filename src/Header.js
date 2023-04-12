import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Info from './Info';
import Page from './Page';
import SignUp from './SignUp';
import Writing from './Writing';
import ball from './img/ball.jpeg';
// import 

const Header = () => (
    <div className="Header">
        <div className="logo">
            <img src={ball} />
        </div>
        <div>
            
            <div className="find">
                <input placeholder="find .." />
            </div>
            <button>Button</button>
        </div>
        <div>
            <Link to="/">Home</Link>
            <Link to="/Info">1</Link>
            <Link to="/Page">2</Link>
            <Link to="/SignUp">3</Link>
            <Link to="/Writing">4</Link>
        </div>

        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/Info" element={<Info />} />
            <Route path="/Page" element={<Page />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Writing" element={<Writing />} />
        </Routes>
    </div>
);

export default Header;

