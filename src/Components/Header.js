import React, { useState } from 'react';
import ball from '../img/ball.jpeg';
import "../css/Header.css";
import "../css/reset.css";

function Header({ setSelectPage }) {
    const [search, setSearch] = useState("");

    function searchTitle() {
        setSelectPage("⚧" + search);
    }

      return (
        <div className="Header">
        <div className="logo">
            <img src={ball} onClick={() => {setSelectPage('Home')}} />
        </div>
        <div>
            <div className="find">
                <input className='find_input' placeholder="find .." onChange={(event) => setSearch(event.target.value)}/>
            </div>
            <button className='find_btn' onClick={() => {searchTitle()}}>Search</button>
        </div>
        <nav className='nav_bar'>
        <ul>
          <li><a href="#" onClick={() => setSelectPage('Home')}>Home</a></li>
          <li><a href="#" onClick={() => setSelectPage('Korean')}>한식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Chinese')}>중식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Western')}>양식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Japan')}>일식</a></li>
          <li><a href="#" onClick={() => setSelectPage('Dessert')}>디저트</a></li>
        </ul>
      </nav>
    </div>
      );
  }

export default Header;

