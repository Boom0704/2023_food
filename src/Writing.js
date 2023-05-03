import img_1 from './img/1.jpeg';
import { useState, useEffect, useRef } from "react";
import "./css/Writing.css";
import Fire from "./Components/Fire";
import useFirebaseStorage from "./Components/useFirebaseStorage";
import { doc, setDoc } from 'firebase/firestore';
import autosize from 'autosize';

function Writing( {foodType, setSelectPage, loginState} ) {
    const { data } = Fire("Forbidden");
    const { db } = Fire("Post");
    const { uploadFile } = useFirebaseStorage();

    const [title, setTitle] = useState("");  // 제목 
    const [type, setType] = useState("");  // 음식 타입 - 한식 중식 머시기
    const [content, setContent] = useState("");  // 글쓰는 부분 
    const [addedContent, setAddedContent] = useState([{
      id : "1",
      address :"https://firebasestorage.googleapis.com/v0/b/inyyfood.appspot.com/o/images%2Faa.jpg?alt=media&token=d8a654ce-cc3c-477a-9e9a-25864918921d",
      content :"사과"
      },{
      id : "2",
      address :"https://firebasestorage.googleapis.com/v0/b/inyyfood.appspot.com/o/images%2FKakaoTalk_Photo_2023-03-02-18-14-45%20012.jpeg?alt=media&token=fb746066-b736-4252-a85c-808780648bcf",
      content :"좋아해"
      },{
      id : "3",
      address :"https://firebasestorage.googleapis.com/v0/b/inyyfood.appspot.com/o/images%2FKakaoTalk_Photo_2023-03-02-18-14-45%20006.jpeg?alt=media&token=998e006a-716a-4921-ac88-72d3b6d0cb36",
      content :"룰루"
      }]); // 사진123, 글1234 
    const textareaRef = useRef(null);  // 

    function removePic(obj) {  // 사진 지우기   // 다시 설명 
      let newArr = [];
      const confirmChange = window.confirm("사진 지울래용?");
      if (confirmChange) {
        if (obj === addedContent[0]) {
          setContent(content + " " + obj.content);
        } else {
          let addValue = addedContent.indexOf(obj);

          let newObj = {
            address: addedContent[addValue-1].address,
            id: addedContent[addValue-1].id,
            content: addedContent[addValue-1].content + " " + obj.content
          }
          
          newArr = addedContent.map(x=> x == addedContent[addValue-1] ? newObj : x)
        }
        setAddedContent([...newArr.filter((pc) => pc !== obj)]);
      }
    }

    useEffect(() => {
      if (textareaRef.current) {
        autosize(textareaRef.current);
      }
    }, []);

    const handleWritingSubmit = async (e) => {
      e.preventDefault();
      const now = new Date();
      const user_id = loginState.id;
      const view = 0;
      const like = "";
      const nickname = loginState.nickname; 
      const id = now.getTime().toString(); 
      const date = now.toISOString();
      const picture = loginState.picture;
      const comment = "";

      // 제목이랑 글쓰기 란에 나쁜말 있는지 확인 
      const datas = data.map((x) => x.word);  // 금지 단어들 배열로 가져옴 
      const forbiddenTitle = datas.filter((x) => title.includes(x));
      const forbiddenContent = datas.filter((x) => content.includes(x));
      const titleContent = [...new Set([...forbiddenTitle, ...forbiddenContent])];

      if (type === "") {
        alert("음식 종류를 선택하지 않았습니다.");
      } else if (titleContent.length !== 0) {
        alert( titleContent.join(', ') + " 나쁜말! 🤬");
      } else {
        try {
          await setDoc(doc(db, 'Post', id), { id, title, content, like, type, view, nickname, date, picture, comment, user_id });
            setSelectPage(type);
        } catch (error) {
          console.log("아이디" + loginState.nicknames);
          console.error(error);
          alert("올리기 실패 : " + error);
        }
      }
    }

    const handleAddPic = () => {
      // 나머지 코드
      alert("더ㅜㅐㅣㅑ");
    }


    return (
      <div className="Writing">
        <form onSubmit={handleWritingSubmit}>
          <label className="writing_title_header">
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

            <input type="file" accept="image/*" onInput={() => {handleAddPic();}}/>
            <div className="previewImg"></div>
            <div className="writing_box">
              <textarea
              value={content}
              className="writing_textarea"
              placeholder="Input some text."
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}></textarea>
              {addedContent.map((obj) => <AddedWriting removePic={removePic} obj={obj} />)}
            </div>
            <button type="submit" className="ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }


  function AddedWriting({removePic, obj}) {
    const textareaRef = useRef(null); 
  

    useEffect(() => {
      if (textareaRef.current) {
        autosize(textareaRef.current);
      }
    }, []);
    
    return (
    <div>
      <img className="writing_picture" src={obj.address} onClick={()=> {removePic(obj)}} />
      <textarea
        value={obj.content} // onChange가 아닌 값으로 textarea와 text의 값을 임의로 변경 
        className="writing_textarea"
        placeholder="Input some text."
        // onChange={(e) => setText(e.target.value)}
        ref={textareaRef}>
      </textarea>
      <span></span>

    </div>
    );
  }

  
  export default Writing;
  