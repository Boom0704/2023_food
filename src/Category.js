import "./css/Category.css";
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import Fire from './Components/Fire';

function Category( {foodType, setSelectPage, setPost, loginState} ) {
  const { data, db } = Fire("Post");
  
  const Writing_button = () => {
    setSelectPage("Writing");
  }
  
  function searchFilterContent(fd) {
    let searchSplit = foodType.substr(1).split(" ");
    let searchText = fd.title + " " + fd.content + " " + fd.nickname;
    let searchBool = searchSplit.map((x) => searchText.includes(x));
    return searchBool.filter((x) => !x).length === 0 ? true : false ;
  }

  const [ currentPage, setCurrentPage ] = useState(1);

  const total_card = 6;  // 보여줄 카드 개수
  const lastNum = currentPage * total_card;  // 마지막 페이지 번호 
  const startNum = lastNum - total_card ;  // 첫번째 페이지 번호 

  const [ dataSlice, setDataSlice ] = useState([]);

  let slicedData = data.filter((x) => foodType === x.type).slice(startNum, lastNum);
  let lastPage = Math.ceil(data.filter((x) => foodType === x.type).length/total_card);

  if (foodType === "MyPage") {
    slicedData = data.filter((x) => loginState.id === x.user_id).slice(startNum, lastNum);
    lastPage = Math.ceil(data.filter((x) => loginState.nickname === x.nickname).length/total_card);
  } else if (foodType.charAt(0) === '⚧') {
      let filteredSearch = data.filter((x) => searchFilterContent(x));
      slicedData = filteredSearch.slice(startNum, lastNum);
      lastPage = Math.ceil(filteredSearch.length/total_card);
      // alert(filteredSearch.length);
  }

  
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
  }, [currentPage, data, foodType, lastPage]);

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
            {(foodType === 'MyPage') ? <span>{loginState.nickname}님의</span> :
            (foodType.charAt(0) === '⚧')  ? foodType.substr(1).split(' ').map(x=> <span>{"\["+ x + "\] "}</span> ) : <span>{foodType}</span>}
            {(foodType.charAt(0) === '⚧') ? " 검색 결과" : " 게시판"}
            </h3>
            {loginState == false ? <></> : <button className='writing_btn' onClick={Writing_button}>글쓰기</button>}
      </div>
        { (foodType === "Home") 
          ? data.map((card) => <Writing_Card info={card} setSelectPage={setSelectPage} setPost={setPost} db={db} />) 
          : <></> }
        {slicedData.map((card) => <Writing_Card info={card} setSelectPage={setSelectPage} setPost={setPost} db={db} />)} {/* 선택한 음식 종류에 해당하는 게시물만 보여주기 */}
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => pageMove(currentPage - 1)}
          >
            {"<"}
          </button>
          {dataSlice.map((x) => (
            <button
              className="pagination-btn"
              onClick={() => pageMove(x)}
            >
              {x}
            </button>
          ))}
          <button
            className="pagination-btn"
            disabled={currentPage === lastPage}
            onClick={() => pageMove(currentPage + 1)}
          >
            {">"}
          </button>
      </div>
      </div>
    );
  }

  function Writing_Card( {info, setSelectPage, setPost, db} ) {  // info: 게시물 정보
    const docRef = doc(db, 'Post', info.id);
    const [ profileImg, setProfileImg ] = useState([]);

    const updateData = {
      view: info.view + 1
    };

    useEffect(() => {
      setProfileImg(info.picAdd.split("ㅤ"));
      if (info.picAdd == "") {
        setProfileImg(["https://firebasestorage.googleapis.com/v0/b/inyyfood.appspot.com/o/images%2F%EC%8A%88%ED%81%AC%EB%A6%BC.jpg?alt=media&token=1493c0f7-b806-4903-af8a-0501c9ca590d"]);
      }
    }, []);

    return (
      <div className='card' onClick={ async () => {
        await updateDoc(docRef, updateData);
        info.view = info.view + 1;
        setPost(info);  // info를 post 변수에 저장 
        setSelectPage('Page');  // 글 상세페이지(Page)로 이동! 
      } }> 
        <img className='preview_img' src={profileImg} />
        <h2 className="Writing_Card_title">{info.title}</h2>
        <p className='card_info_p'>{info.content}</p>
        <div className='profile__like__view'>
          <img className='user_profile_img' src={info.picture} />
          <div className='icon_like'>
            <span>🩷</span>
            <span>{info.like.split("☯").length-1}</span>
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
  