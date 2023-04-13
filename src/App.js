import Category from './Category';

function App({ selectedPage }) {
  if (selectedPage === 'Korean') {
    return <Category foodType={selectedPage}/>;
  } else if (selectedPage === 'Chinese') {
    return <Category foodType={selectedPage}/>;
  } else if (selectedPage === 'West') {
    return <Category foodType={selectedPage}/>;
  } else if (selectedPage === 'Japan') {
    return <Category foodType={selectedPage}/>;
  } else if (selectedPage === 'Dessert') {
    return <Category foodType={selectedPage}/>;
  } else {
    return <div>ERROR</div>;
  }
}

export default App;