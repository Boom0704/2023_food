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
    const [addedContent, setAddedContent] = useState([]); // 사진123, 글1234 
    const textareaRef = useRef(null);  // 
    const [file, setFile] = useState(null); // file을 저장할 공간

    function removePic(obj) {  // 사진 지우기   
      let newArr = [...addedContent];  // 깊은 복사 (... 쪼개기 -> 주소를 가져와서 쪼갬)
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
        try
        {
          let total = content;
          let picAdd = "";
          for(let i=0; i<addedContent.length; i++){
            total += "ㅤ" + addedContent[i].content;
          }
          for(let i=0; i<addedContent.length; i++){
            let tempPic = await uploadFile(addedContent[i].uploadPic);
            
            if(picAdd==""){
              picAdd = tempPic;
            }
            else{
              picAdd += "ㅤ" + tempPic;
            }
          }
          await setDoc(doc(db, 'Post', id), { id, title, content:total, like, type, view, nickname, date, picture, comment, user_id, picAdd});
            setSelectPage(type);
        } catch (error) {
          console.log("아이디" + loginState.nicknames);
          console.error(error);
          alert("올리기 실패 : " + error);
        }
      }
    }

    const handleAddPic = (e) => {
      setFile(e.target.files[0]);
      const temp = e.target.files[0];
      let url = (URL.createObjectURL(temp));
      const now = new Date();
      const newPic = {
        id : now.getTime().toString(),
        address : url,
        content : "",
        uploadPic : e.target.files[0]
      }

      setAddedContent([...addedContent, newPic]);
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

            <input type="file" accept="image/*" onChange={(e) => {handleAddPic(e);}}/>
            <div className="previewImg"></div>
            <div className="writing_box">
              <textarea
              value={content}
              className="writing_textarea"
              placeholder="Input some text."
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}></textarea>
              {addedContent.map((obj) => <AddedWriting removePic={removePic} obj={obj} addedContent={addedContent} setAddedContent={setAddedContent} file ={file} />)}
            </div>
            <button type="submit" className="ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }

  function AddedWriting({removePic, obj, addedContent, setAddedContent, file}) {
    const textareaRef = useRef(null); 
    
    function onChangeText(e){

      let newObj = {
        address: obj.address,
        id: obj.id,
        uploadPic: obj.uploadPic,
        content: e.target.value
      }
      let newArr = addedContent.map(x=> x == obj ? newObj : x);
      setAddedContent([...newArr]);
    }  

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
        onChange={(e) => {onChangeText(e)}}
        ref={textareaRef}>
      </textarea>
    </div>
    );
  }
  
  export default Writing;