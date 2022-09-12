import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import AddBook from './pages/AddBook';
import BookList from './pages/BookList';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={BookList} />
        <Route path="/add-new-book" component={AddBook} />
        <Route path="/update-book/:id" component={AddBook} />
      </Switch>
    </Router>
  );
}

export default App;
