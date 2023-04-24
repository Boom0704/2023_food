import Comment from "./Components/Comment";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import Fire from "./Components/Fire"; // Firestore 객체 가져오기
import "./css/Page.css";


function Page( {foodType, setSelectPage, post, loginState} ) {
  const [comment, setComment] = useState(
    [{
      id :1,
      nickname :"a",
      content : "내용이요.",
      date : "2019년 3월 22일",
      is_head : 0,
   }, {
      id :2,
      nickname :"a",
      content : "내용이요.",
      date : "2019년 3월 22일",
      is_head : 0,
   },{
      id :3,
      nickname :"a",
      content : "대댓글이요.",
      date : "2019년 3월 22일",
      is_head : 1,
   }, {
      id :4,
      nickname :"a",
      content : "내용이요.",
      date : "2019년 3월 22일",
      is_head : 0,
   } ]
  );

  const { data, db } = Fire("Post");
  
  const deletePost = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "Post", post.id));

    setSelectPage("Home");
  }

  return (
    <div className="allPage">
      <h2 className="page_title">글 제목 : {post.title}</h2>
      <span className="mini_info">날짜 : {post.date}</span>
      <span className="mini_info">작성자 : {post.nickname}</span>
      <span className="mini_info">조회수 : {post.view}</span>
      <span className="mini_info">추천 : {post.like}</span>
      <div>
        <p className="page_content">{post.content}</p>
      </div>
      <div className="btns">
        <button className="likeBtn">🩵<text>{post.like}</text></button>
        {(post.nickname === loginState.nickname) ? 
        <button className="deletePostBtn" onClick={deletePost}>삭제 버튼</button> :
        (loginState.isAdmin) ? <button className="deletePostBtn" onClick={deletePost}>삭제 버튼</button> : <></> }
      </div>
      <div className="comment">
        <div>
          <input type="text" />
          <button>입력</button>
        </div>
        {comment.map((x) => <Comment x={x} />)}
      </div>
    </div>
  );
}

export default Page;