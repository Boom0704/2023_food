import Fire from "./Fire";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import "../css/Comment.css";

function Comment({x}) {
  const {data, db, setData} = Fire("Forbidden");

  function handleDeleteComment() {
    alert("삭제 버튼이에용");
  }

  function handleReComment() {
    
  }

  return (
  <>
    <div className="container">
      <span className="nickname">{x.nickname} : </span>
      <span className="content">{x.content}</span>
      <span className="date">{x.date}</span>
      <button className="replyBtn" onClick={() => {handleReComment()}}>💬</button>
      <button className="deleteBtn" onClick={() => {handleDeleteComment()}}>❌</button>
    </div>
    {x.reComment.map((cmt) => <ReComment cmt={cmt} />)}
    </>
    );
}


function ReComment({cmt}) {

  function handleDeleteComment() {
    alert("삭제 버튼이에용");
  }

  return (
    <div className="container">
      <span className="ㄴ">ㄴ</span>
      <span className="nickname">{cmt.nickname} : </span>
      <span className="content">{cmt.content}</span>
      <span className="date">{cmt.date}</span>
      <button className="deleteBtn" onClick={() => {handleDeleteComment()}}>❌</button>
    </div>
    );
}

export default Comment;