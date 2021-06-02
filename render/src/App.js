import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/Main';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
