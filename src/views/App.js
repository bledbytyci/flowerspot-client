import '../styles/App.css';
import configureStore from '../setup/store';
import { Provider } from 'react-redux';
import React from 'react-redux';

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <h1>test</h1>
      </Provider>
    </div>
  );
}

export default App;