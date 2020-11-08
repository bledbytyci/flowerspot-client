import '../styles/App.css';
import configureStore from '../setup/store';
import { Provider } from 'react-redux';
import React from 'react-redux';
import  Router  from './router.jsx';

const store = configureStore();

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <Router />
        </Provider>
      </div>
  );
}

export default App;