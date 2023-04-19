import { useSearchParams } from "react-router-dom";
import Comment from "./Components/Comment";
import { useState } from "react";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import Fire from "./Components/Fire";


function Page( {foodType, onSelectPage, post, loginState} ) {
  const [comment, setComment] = useState(["a"]);

  const deletePost = (event) => { 
    event.preventDefault();
    onSelectPage("Home");
  }

  return (
    <div>
      <h2>글 제목 : {post.title}</h2>
      <span>날짜 : {post.date}</span>
      <span>작성자 : {post.nickname}</span>
      <span>조회수 : {post.view}</span>
      <span>추천 : {post.like}</span>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <button>추천 버튼</button>
        <text>{post.like}</text>
        {(post.nickname === loginState.nickname) ? 
        <button className="deletePostBtn" onClick={deletePost}>삭제 버튼</button> : <></> }
      </div>
      <div className="comment">
        {comment.map((x) => <Comment />)}
      </div>
    </div>
  );
}


export default Page;
