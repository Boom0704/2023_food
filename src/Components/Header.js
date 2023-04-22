import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import ball from '../img/ball.jpeg';
import "../css/Header.css";
import "../css/reset.css";

const Header = ( {setSelectPage} ) => (
    <div className="Header">
        <div className="logo">
            <img src={ball} />
        </div>
        <div>
            <div className="find">
                <input className='find_input' placeholder="find .." />
            </div>
            <button className='find_btn'>Button</button>
        </div>
        <nav className='nav_bar'>
        <ul>
          <li><a href="#" onClick={() => setSelectPage('Home')}>Home</a></li>
          <li><a href="#" onClick={() => setSelectPage('Korean')}>한식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Chinese')}>중식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Western')}>양식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Japan')}>일식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Dessert')}>디저트</a></li>
          <li><a href="#" onClick={() => setSelectPage('Writing')}>글쓰기</a></li>
        </ul>
      </nav>
    </div>
);

export default Header;

