import { useState, useEffect } from 'react';
import Fire from './Fire';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
//import "./css/Modal.css";

function Modal({ handleCloseModal }) {

  const {data, db, setData} = Fire("Forbidden");
  const [word, setWord] = useState('');

  async function handleAddWord() {
    const now = new Date(); 
    const id = now.getTime().toString(); 
      if (word === "") {
        alert("추가할 단어를 입력해주세용!");
      } else {
        await setDoc(doc(db, 'Forbidden', id), { word, id });
        setData(...data, word);
        handleCloseModal();
    }
  }

  return(
  <div>
    <h2>금지 단어</h2>
    <input className='forbidden_input' type="text" onChange={(event) => setWord(event.target.value)}></input>
    <button className='forbidden_add_btn' onClick={handleAddWord}>Add</button>
    <div className='forbidden_word_list'>
      {data.map((x) => <ForbiddenWord x={x} handleCloseModal={handleCloseModal}/>)}
    </div>
    <button onClick={handleCloseModal}>Close</button>
  </div>
  );
}

function ForbiddenWord({x, handleCloseModal}) {
  const {db} = Fire("Forbidden");

  async function handleDeleteWord() {
    try{
      await deleteDoc(doc(db, "Forbidden", x.id));
    }
    catch(e){
      alert(x);
    }
    handleCloseModal();
  }


  return (
    <>
      <p className='forbidden_content'>{x.word}</p>
      <button className='forbidden_delete_btn' onClick={() => {handleDeleteWord()} }>❌</button>
    </>
  );
}
export default Modal;