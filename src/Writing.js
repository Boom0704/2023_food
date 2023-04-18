import { useState } from "react";
import "./css/Writing.css";
import Fire from "./Components/Fire";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { addDoc, collection } from 'firebase/firestore';

function Writing( {foodType, onSelectPage} ) {
    const { data, db } = Fire("Post");

    const [title, setTitle] = useState("");  // 제목 
    const [type, setType] = useState("");  // 음식 타입 - 한식 중식 머시기
    const [content, setContent] = useState("");  // 글쓰는 부분 

    const handleWritingSubmit = async (e) => {
      e.preventDefault();
      const now = new Date();
      const view = 0;
      const like = 0;
      const writer = "세인";
      const id = now.getTime().toString();  
      const date = now.toISOString();

      if (type === "") {
        alert("음식 종류를 선택하지 않았습니다.");
      } else {
        try {
          await addDoc(collection(db, 'Post'), { id, title, content, like, type, view, writer, date });
          onSelectPage(type);
        } catch (error) {
          console.error(error);
          alert("올리기 실패 : " + error);
        }
      }
    }

    return (
      <div className="Writing">
        <form onSubmit={handleWritingSubmit}>
          <label className="title">
            제목
            <input type="text" className="writing_title" placeholder='제목' onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
            <select name="select_food" onChange={(e) => setType(e.target.value)}>
              <option value="">음식 선택</option>
              <option value="Korean">한식</option>
              <option value="Western">양식</option>
              <option value="Chinese">중식</option>
              <option value="Japan">일식</option>
              <option value="Dessert">디저트</option>
            </select>
              <button className="pic_btn">사진</button>

            <p>
              <textarea className="writing_textarea" placeholder="Input some text." onChange={(e) => setContent(e.target.value)}></textarea>
            </p>
            <button type="submit" className="ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }
  
  export default Writing;
  