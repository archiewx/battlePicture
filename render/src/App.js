import { Route, Switch } from 'react-router-dom';
import RenderLayout from './layout';
import AboutPage from './pages/About';
import ChangelogPage from './pages/Changelog';
import MainPage from './pages/Main';
import MePage from './pages/Me';
import RecentlyPage from './pages/Recently';

function App() {
  return (
    <div className="app">
      <RenderLayout>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/me" component={MePage} />
          <Route path="/recently" component={RecentlyPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/changelog" component={ChangelogPage} />
        </Switch>
      </RenderLayout>
    </div>
  );
}

export default App;
