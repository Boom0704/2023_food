import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import ball from './img/ball.jpeg';
import "./css/Header.css";
import "./css/reset.css";

const Header = ( {onSelectPage} ) => (
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
          <li><a href="#" onClick={() => onSelectPage('Home')}>Home</a></li>
          <li><a href="#" onClick={() => onSelectPage('Korean')}>한식</a></li>
          <li><a href="#" onClick={() => onSelectPage('Chinese')}>중식</a></li>
          <li><a href="#" onClick={() => onSelectPage('Western')}>양식</a></li>
          <li><a href="#" onClick={() => onSelectPage('Japan')}>일식</a></li>
          <li><a href="#" onClick={() => onSelectPage('Dessert')}>디저트</a></li>
          <li><a href="#" onClick={() => onSelectPage('Writing')}>글쓰기</a></li>
        </ul>
      </nav>
    </div>
);

export default Header;

