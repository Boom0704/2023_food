import { useState } from 'react';
//import "./css/Modal.css";

function Modal({handleCloseModal}) {

  const [wordList, setWordList] = useState(['a']);

  return(
  <div>
    <h2>금지 단어</h2>
    <input className='forbidden_input' type="text"></input>
    <button className='forbidden_add_btn'>Add</button>
    <div className='forbidden_word_list'>
      {wordList.map((x) => <ForbiddenWord />)}
    </div>
    <button onClick={handleCloseModal}>Close</button>
  </div>
  );
}


function ForbiddenWord() {
  return(
    <>
    <p className='forbidden_content'></p>
    <button className='forbidden_delete_btn'></button>
    </>
  );
}

export default Modal;