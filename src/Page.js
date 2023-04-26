import Comment from "./Components/Comment";
import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Fire from "./Components/Fire"; // Firestore 객체 가져오기
import "./css/Page.css";


function Page( {foodType, setSelectPage, post, loginState} ) {

  let commentSplit = post.comment.split("🁽🁮");
  let parseData = [];
  if (post.comment !== "") {
    parseData = commentSplit.map((cs) => JSON.parse(cs));
  }

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
    
    parseData.push(dummy);
    let stringifyData = parseData.map((x)=>JSON.stringify(x)).join("🁽🁮");
    const updateData = {
      comment: stringifyData
    };
    const docRef = doc(db, 'Post', post.id);
    await updateDoc(docRef, updateData);
    post.comment = stringifyData;
    setData(post);
  }

  async function likeUnlike() {
    let newLike = "";

    if (post.like == "") {  // ㄹㅇ 아이디가 존재하지 않을 때 
        newLike = "☯"+ loginState.id;
    } else {
        if (post.like.includes(loginState.id)) {  // 내 아이디가 존재할 때 
          let likeSubID = post.like.split("☯").filter((x) => x != loginState.id);
          likeSubID = likeSubID.filter(x=> x!=="");
          newLike = likeSubID.join("☯");
          newLike = "☯" + newLike;
        } else {  // 내 아이디가 없을 때 
          newLike = post.like + "☯"+ loginState.id;
        }
    }
    if (newLike === "☯") newLike="";
    const updateData = {
      like: newLike
    };

    const docRef = doc(db, 'Post', post.id);
    await updateDoc(docRef, updateData);
    post.like = newLike;
    setData(post);
  }


  return (
    <div className="allPage">
      <h2 className="page_title">글 제목 : {post.title}</h2>
      <span className="mini_info">날짜 : {post.date}</span>
      <span className="mini_info">작성자 : {post.nickname}</span>
      <span className="mini_info">조회수 : {post.view}</span>
      <span className="mini_info">추천 : {post.like.split("☯").length-1}</span>
      <div>
        <p className="page_content">{post.content}</p>
      </div>
      <div className="btns">
        <button className="likeBtn" onClick={likeUnlike}>🩵<text>{post.like.split("☯").length-1}</text></button>
        {(post.user_id === loginState.id) ? 
        <button className="deletePostBtn" onClick={deletePost}>삭제 버튼</button> :
        (loginState.isAdmin) ? <button className="deletePostBtn" onClick={deletePost}>삭제 버튼</button> : <></> }
      </div>
      <div className="comment">
        <div>
          <input type="text" onChange={(event) => setNewComment(event.target.value)} />
          <button onClick={() => {handleAddComment()}}>입력</button>
        </div>
        {parseData.map((cmt) => <Comment cmt={cmt} post={post} loginState={loginState} parseData={parseData} />)}
      </div>
    </div>
  );
}

export default Page;