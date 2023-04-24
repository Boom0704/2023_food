import Fire from "./Fire";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

function Comment({x}) {
  const {data, db, setData} = Fire("Forbidden");

  function handleDeleteComment() {
    alert("삭제 버튼이에용");
  }

  function handleReComment() {
    
  }

  return (
    <div>
      <span>{x.nickname}</span>
      <span>{x.content}</span>
      <span>{x.date}</span>
      <button onClick={() => {handleReComment()}}>💬</button>
      <button onClick={() => {handleDeleteComment()}}>❌</button>
    </div>
  );
}

export default Comment;
