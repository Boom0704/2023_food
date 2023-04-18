import img_1 from './img/1.jpeg';
import "./css/Category.css";
import { useState } from 'react';
import Fire from './Components/Fire';

function Category( {foodType, onSelectPage} ) {
  const { data, db } = Fire("Post");

  const Writing_button = (event) => {
    event.preventDefault();
    onSelectPage("Writing");
  }

  return (
      <div>
        <div>음식 종류 : {foodType}</div>
        {data.map((x) => <Writing_Card info={x} onSelectPage={onSelectPage}/> )}
        <div> PAGE 번호 </div>
        <div>
          <button onClick={Writing_button}>글쓰기</button>
        </div>
      </div>
    );
  }

  function Writing_Card( {info, onSelectPage} ) {
    return (
      <div className='card' onClick={() => onSelectPage('Page')}> 
        <img className='preview_img' src={img_1} />
        <h2>{info.title}</h2>
        <p>{info.content}</p>
        <div className='profile__like__view'>
          <img className='user_profile_img' src={img_1} />
          <div className='icon_like'>
            <span>icon/like</span>
            <span>{info.like}</span>
          </div>
          <div className='icon_view'>
            <span>icon/view</span>
            <span>{info.view}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default Category;
  