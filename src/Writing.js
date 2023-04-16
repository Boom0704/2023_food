import "./css/Writing.css";

function Writing() {
    return (
      <div className="Writing">
        <form>
          <label className="title">
            제목
            <input type="text" className="writing_title" placeholder='제목' />
          </label>
          <br />
            <select name="select_food">
              <option value="">음식 선택</option>
              <option value="korean">한식</option>
              <option value="western">양식</option>
              <option value="chinese">중식</option>
              <option value="japan">일식</option>
              <option value="dessert">디저트</option>
            </select>
              <button className="pic_btn">사진</button>
  
            <p>
              <textarea className="writing_textarea" placeholder="Input some text."></textarea>
            </p>
            <button className="ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }
  
  export default Writing;
  