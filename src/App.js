import { BrowserRouter as Routers, Router, Route } from 'react-router-dom';
import Category from './Category';

function App() {
  return (
    <Router>
        <Route path="/Korean" render={() => <Category foodType="Korean" />} />
        <Route path="/Chinese" render={() => <Category foodType="Chinese" />} />
        <Route path="/West" render={() => <Category foodType="West" />} />
        <Route path="/Japan" render={() => <Category foodType="Japan" />} />
        <Route path="/Dessert" render={() => <Category foodType="Dessert" />} />
        <Route component={() => <div>ERROR</div>} />
    </Router>
  );
}

export default App;