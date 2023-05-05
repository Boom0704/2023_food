import Fire from "./Fire";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import "../css/Comment.css";

function Comment({cmt, post, loginState, parseData }) {
  const { db, setData} = Fire("Post");
  
  const [ newComment, setNewComment ] = useState("");

  function DeleteComment() {
    const filteredData = parseData.filter((x) => x.id !== cmt.id);
    let stringifyCmt = filteredData.map((x)=>JSON.stringify(x)).join("🁽🁮");
    updateComment(stringifyCmt);
  }

  async function AddReComment() {  // 외부데이터는 다 async 
    const now = new Date();
    let reCmt = {
      id : now.getTime().toString(),
      nickname : loginState.nickname,
      user_id : loginState.id,
      content : newComment,
      date : now.toISOString(),
    }
    cmt.reComment.push(reCmt); 
    let parseReComment = parseData.map((x) => x.id === cmt.id ? cmt : x);
    let stringifyData = parseReComment.map((x)=>JSON.stringify(x)).join("🁽🁮");
    updateComment(stringifyData);
  }

  function DeleteReComment(cmt2) {  
    cmt.reComment = cmt.reComment.filter((x) => x.id !== cmt2.id);
    let replaceReCmt = parseData.map((x) => x.id ===  cmt.id ? cmt : x);
    let joinReCmt = replaceReCmt.map((x)=>JSON.stringify(x)).join("🁽🁮");
    updateComment(joinReCmt);
  }  

  function handleOpenClose() {
    setIsOpen(!isOpen);
  }

  async function updateComment(latestComment) {
    const docRef = doc(db, 'Post', post.id);
    const updateData = {
      comment: latestComment
    };
    await updateDoc(docRef, updateData);
    post.comment = latestComment;
    setData(post);
  }
 
  const [isOpen, setIsOpen] = useState(false); 



  return (
  <>
    <div className="container_comment">
      <span className="nickname">{cmt.nickname} : </span>
      <span className="content">{cmt.content}</span>
      <span className="date">{cmt.date}</span>
      <button className="replyBtn" onClick={() => {handleOpenClose()}}>💬</button>
      {(cmt.user_id === loginState.id) ? 
        <button className="deleteBtn" onClick={() => {DeleteComment()}}>❌</button> :
        (loginState.Admin) ? <button className="deleteBtn" onClick={() => {DeleteComment()}}>❌</button> : <></> }

    </div>
      {isOpen && 
       <div>
        <span className="ㄴ">ㄴ</span>
        <input type="text" onChange={(event) => setNewComment(event.target.value)} />
        <button onClick={() => {AddReComment()}}>입력</button>
      </div> }

    {cmt.reComment.map((cmt2) => <ReComment cmt2={cmt2} DeleteReComment={DeleteReComment} loginState={loginState} post={post} />)}
    </>
    );
}


function ReComment({cmt2, DeleteReComment, loginState}) {

  return (
    <div className="container_comment">
      <span className="ㄴ">◡̈♥</span>
      <span className="nickname">{cmt2.nickname} : </span>
      <span className="content">{cmt2.content}</span>
      <span className="date">{cmt2.date}</span>
      {(cmt2.user_id === loginState.id) ? 
        <button className="deleteBtn" onClick={() => {DeleteReComment(cmt2)}}>❌</button> :
        (loginState.Admin) ? <button className="deleteBtn" onClick={() => {DeleteReComment(cmt2)}}>❌</button> : <></> }
    </div>
    );
}

export default Comment;