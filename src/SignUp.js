import "./css/SignUp.css";

function SignUp() {
    return (
      <div className="Writing">
        <form>
          <label className="title">
            ID
            <input type="text" className="user_ID" placeholder='ID' />
          </label>
          <br />
          <label className="title">
            PW
            <input type="password" className="user_PW" placeholder='Password' />
          </label>
          <br />
          <label className="title">
            Confirm PW
            <input type="password" className="confirm_PW" placeholder='Confirm Password' />
          </label>
          <br />
          <label className="title">
            Nickname
            <input type="text" className="user_nickname" placeholder='Your Nickname' />
          </label>
          <br />
          <label className="title">
            Status
            <textarea className="user_status"></textarea>
          </label>
          <br />
            <input type="file" />
  
            <button className="ok_btn">OK</button>
          <br />
        </form>
      </div>
    );
  }
  

  export default SignUp;
  