import Comment from "./Components/Comment";
import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Fire from "./Components/Fire"; // Firestore 객체 가져오기
import "./css/Page.css";


function Page( {foodType, setSelectPage, post, loginState} ) {

  //let commentSplit = post.comment.split("🁽🁮");
  //const parseData = commentSplit.map((cs) => JSON.parse(cs));

  const { data, db, setData } = Fire("Post");
  const [ newComment, setNewComment ] = useState("");

  const deletePost = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "Post", post.id));

    setSelectPage("Home");
  }


  async function handleAddComment() {  // 외부데이터는 다 async 
    const now = new Date();
    let dummy = {
      id : now.getTime().toString(),
      nickname : loginState.nickname,
      user_id : loginState.id,
      content : newComment,
      date : now.toISOString(),
      reComment : []
    }

    const updateData = {
      comment: "",
    };
    const docRef = doc(db, 'Post', post.id);
    await updateDoc(docRef, updateData);
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
          <input type="text" onChange={(event) => setNewComment(event.target.value)} />
          <button onClick={() => {handleAddComment()}}>입력</button>
        </div>
        {/* {parseData.map((x) => <Comment x={x} />)} */}
      </div>
    </div>
  );
}

export default Page;