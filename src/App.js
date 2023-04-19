import Category from './Category';
import Writing from './Writing';
import SignUp from './SignUp';
import Page from './Page';
import MyPage from './MyPage';
import { useState } from "react";

function App({ selectedPage, onSelectPage, loginState }) {

  const header_foodtype = ["Korean", "Chinese", "Japan", "Western", "Dessert", "Home"];
  const [post, setPost] = useState(null);  // 개시물 

  if (header_foodtype.includes(selectedPage)) { 
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} setPost={setPost} />;
  } else if (selectedPage === 'SignUp') {
    return <SignUp foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else if (selectedPage === 'Writing') {
    return <Writing foodType={selectedPage} onSelectPage={onSelectPage} loginState={loginState} />; 
  } else if (selectedPage === 'Page') {
    return <Page foodType={selectedPage} onSelectPage={onSelectPage} post={post} loginState={loginState} />; 
  } else if (selectedPage === 'MyPage') {
    return <MyPage foodType={selectedPage} onSelectPage={onSelectPage} loginState={loginState} />; 
  } else {
    return <div>ERROR</div>;
  }
}

export default App;