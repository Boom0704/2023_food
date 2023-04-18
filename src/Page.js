import { useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import { useState } from "react";

function Page( {foodType, onSelectPage} ) {
  const [comment, setComment] = useState(["a"]);

  return (
    <div>
      <h2>글 제목</h2>
      <span>날짜</span>
      <span>작성자</span>
      <span>조회수 : 99</span>
      <span>추천 : 100</span>
      <div>
        <p>글!</p>
      </div>
      <div>
        <button>추천 버튼</button>
        <text>100</text>
      </div>
      <div className="comment">
        {comment.map((x) => <Comment />)}
      </div>
    </div>
  );
}

export default Page;
