import Category from './Category';
import Writing from './Writing';
import SignUp from './SignUp';
import Page from './Page';
import MyPage from './MyPage';
import { useState } from "react";

function App({ selectedPage, setSelectPage, loginState, setLoginState }) {

  const header_foodtype = ["Korean", "Chinese", "Japan", "Western", "Dessert", "Home"];
  const [post, setPost] = useState(null);  // 개시물 

  if (header_foodtype.includes(selectedPage)) { 
    return <Category foodType={selectedPage} setSelectPage={setSelectPage} setPost={setPost} loginState={loginState} />;
  } else if (selectedPage === 'SignUp') {
    return <SignUp foodType={selectedPage} setSelectPage={setSelectPage} />; 
  } else if (selectedPage === 'Writing') {
    return <Writing foodType={selectedPage} setSelectPage={setSelectPage} loginState={loginState} />; 
  } else if (selectedPage === 'Page') {
    return <Page foodType={selectedPage} setSelectPage={setSelectPage} post={post} loginState={loginState} />; 
  } else if (selectedPage === 'MyPage') {
    return <>
        <MyPage foodType={selectedPage} setSelectPage={setSelectPage} loginState={loginState} setLoginState={setLoginState} />;
        <Category foodType={selectedPage} setSelectPage={setSelectPage} setPost={setPost} loginState={loginState} />;
        </>
  } else if (selectedPage.charAt(0) === '⚧') {
    return <Category foodType={selectedPage} setSelectPage={setSelectPage} post={post} loginState={loginState} />; 
  } else {
    return <div>ERROR</div>;
  }
}

export default App;