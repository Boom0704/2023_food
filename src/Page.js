import Comment from "./Components/Comment";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import Fire from "./Components/Fire"; // Firestore 객체 가져오기
import "./css/Page.css";


function Page( {foodType, onSelectPage, post, loginState} ) {
  const [comment, setComment] = useState(["a"]);
  const { data, db } = Fire("Post");
  
  const deletePost = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "Post", post.id));

    onSelectPage("Home");
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
        {comment.map((x) => <Comment />)}
      </div>
    </div>
  );
}

export default Page;