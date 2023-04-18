import Category from './Category';
import Writing from './Writing';
import SignUp from './SignUp';
import Page from './Page';

function App({ selectedPage, onSelectPage }) {
  if (selectedPage === 'Korean') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />;
  } else if (selectedPage === 'Chinese') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />;
  } else if (selectedPage === 'West') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />;
  } else if (selectedPage === 'Japan') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />;
  } else if (selectedPage === 'Dessert') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else if (selectedPage === 'SignUp') {
    return <SignUp foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else if (selectedPage === 'Writing') {
    return <Writing foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else if (selectedPage === 'Home') {
    return <Category foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else if (selectedPage === 'Page') {
    return <Page foodType={selectedPage} onSelectPage={onSelectPage} />; 
  } else {
    return <div>ERROR</div>;
  }
}

export default App;