import { Route } from 'react-router-dom';
import DataLogPage from './pages/DataLogPage';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={DataLogPage} />
    </div>
  );
}





