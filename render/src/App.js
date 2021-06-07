import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/Main';
import MePage from './pages/Me';
import RecentlyPage from './pages/Recently';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/me" component={MePage} />
        <Route exact path="/recently" component={RecentlyPage} />
      </Switch>
    </div>
  );
}

export default App;
