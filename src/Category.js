import img_1 from './img/1.jpeg';
import "./css/Category.css";
import { useState } from 'react';
import Fire from './Components/Fire';

function Category( {foodType, onSelectPage, setPost, loginState} ) {
  const { data, db } = Fire("Post");
  
  const Writing_button = (event) => {
    onSelectPage("Writing");
  }

  const [ currentPage, seCurrentPage ] = useState(1);
  const total_card = 6;
  

  return (
      <div>
          <div className='writing_btn_p'>
          <h3 className='category_title'><span>{foodType}</span> 게시판</h3>
          <button className='writing_btn' onClick={Writing_button}>글쓰기</button>
        </div>
        { (foodType === "Home") 
        ? data.map((card) => <Writing_Card info={card} onSelectPage={onSelectPage} setPost={setPost} />) 
        : <></> }
        { data.filter((x) => foodType === x.type)
        .map((card) => <Writing_Card info={card} onSelectPage={onSelectPage} setPost={setPost} />)} {/* 선택한 음식 종류에 해당하는 게시물만 보여주기 */}
          <div>
            <button>{"<"}</button>
            {<button></button>}
            <button>{">"}</button>
          </div>
      </div>
    );
  }

  function Writing_Card( {info, onSelectPage, setPost} ) {  // info: 게시물 정보
    return (
      <div className='card' onClick={() => {
        setPost(info);  // info를 post 변수에 저장 
        onSelectPage('Page');  // 글 상세페이지(Page)로 이동! 
      } }> 
        <img className='preview_img' src={img_1} />
        <h2>{info.title}</h2>
        <p className='card_info_p'>{info.content}</p>
        <div className='profile__like__view'>
          <img className='user_profile_img' src={img_1} />
          <div className='icon_like'>
            <span>🩷</span>
            <span>{info.like}</span>
          </div>
          <div className='icon_view'>
            <span>👀</span>
            <span>{info.view}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default Category;
  