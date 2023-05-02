import { useState, useEffect } from 'react';
import Fire from './Fire';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import "../css/Modal.css";

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
  <div className='container'>
    <h2 className='modalTitle'>금지 단어</h2>
    <div className='constructor'>
    <input className='forbidden_input' type="text" onChange={(event) => setWord(event.target.value)}></input>
    <button className='forbidden_add_btn' onClick={handleAddWord}>Add</button>
    </div>
    <div className='forbidden_word_list'>
      {data.map((x) => <ForbiddenWord x={x} handleCloseModal={handleCloseModal}/>)}
    </div>
    <br />
    <h2 className='modalTitle'>관리자 권한 부여</h2>
    {<DataForAdmin />}
    <button className='close' onClick={handleCloseModal}>Close</button>
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
    <div className='forbidden'>
      <p className='forbidden_content'>{x.word}</p>
      <button className='forbidden_delete_btn' onClick={() => {handleDeleteWord()} }>❌</button>
      <br/>
    </div>
  );
}

function AdminAdd({user, updateAdmin}) {
  const [isChecked, setIsChecked] = useState(user.isAdmin);

  return (
    <div className="forbidden">
      <span className="forbidden_content">{user.nickname}</span>
      <input className="forbidden_delete_btn" type="checkbox" checked={isChecked} onClick={() => {
        updateAdmin(user); setIsChecked(!isChecked)}} />
    </div>
  );
}


function DataForAdmin() {  // 변수명 중복 문제 해결 (파베 db)
  const {data, db, setData} = Fire("User");

  async function updateAdmin(user) {
    const docRef = doc(db, 'User', user.id);
    const updateData = {
      isAdmin: !user.isAdmin
    };
    await updateDoc(docRef, updateData);
  }

  return (
    <div>
      {data.map((user) => <AdminAdd user={user} updateAdmin={updateAdmin} /> )}
    </div>
  );
}
export default Modal;