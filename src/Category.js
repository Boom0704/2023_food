import img_1 from './img/1.jpeg';
import "./css/Category.css";
import { useState, useEffect } from 'react';
import Fire from './Components/Fire';

function Category( {foodType, setSelectPage, setPost, loginState} ) {
  const { data, db } = Fire("Post");
  
  const Writing_button = (event) => {
    setSelectPage("Writing");
  }

  const [ currentPage, setCurrentPage ] = useState(1);

  const total_card = 6;
  const lastNum = currentPage * total_card;
  const startNum = lastNum - total_card ;

  const [ dataSlice, setDataSlice ] = useState([]);


  const slicedData = data.filter((x) => foodType === x.type).slice(startNum, lastNum);
  const lastPage = Math.ceil(data.filter((x) => foodType === x.type).length/total_card);

  useEffect(() => {  
    if (lastPage < 5) {
      const temp = [];
      for (let i=1; i<=lastPage; i++) {
        temp.push(i);
      }
      setDataSlice([...temp]);
    }
    else if (currentPage == 1 || currentPage == 2 ) {
        setDataSlice([1,2,3,4,5]);
      }
    else if (currentPage == lastPage || currentPage == lastPage-1) {
        setDataSlice([lastPage-4, lastPage-3, lastPage-2, lastPage-1, lastPage])
      }
    else {
      setDataSlice( [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2] );
    }
  }, [currentPage, data, foodType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [foodType]);


  function pageMove(x) {
    setCurrentPage(x);
  }


  return (
      <div>
          <div className='writing_btn_p'>
          <h3 className='category_title'> 
          {(foodType == 'MyPage') ? <span>{loginState.nickname}님의</span> : <span>{foodType}</span>} 게시판</h3>
          <button className='writing_btn' onClick={Writing_button}>글쓰기</button>
        </div>
        { (foodType === "Home") 
        ? data.map((card) => <Writing_Card info={card} setSelectPage={setSelectPage} setPost={setPost} />) 
        : <></> }
        {slicedData.map((card) => <Writing_Card info={card} setSelectPage={setSelectPage} setPost={setPost} />)} {/* 선택한 음식 종류에 해당하는 게시물만 보여주기 */}
          <div>
            <button disabled={currentPage==1} onClick={() => pageMove(currentPage-1)}>{"<"}</button>
            {dataSlice.map((x) => <button onClick={() => pageMove(x)}>{x}</button>)}
            <button disabled={currentPage==lastPage} onClick={() => pageMove(currentPage+1)}>{">"}</button>
          </div>
      </div>
    );
  }

  function Writing_Card( {info, setSelectPage, setPost} ) {  // info: 게시물 정보
    return (
      <div className='card' onClick={() => {
        setPost(info);  // info를 post 변수에 저장 
        setSelectPage('Page');  // 글 상세페이지(Page)로 이동! 
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
  