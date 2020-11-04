import '../styles/App.css';
import configureStore from '../setup/store';
import { Provider } from 'react-redux';
import React from 'react-redux';
import Header from './common/header.jsx';
import Navbar from './common/navbar.jsx';
import FlowersPage from './workflow/flowersPage.jsx';

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Header />
        <FlowersPage />
      </Provider>
    </div>
  );
}

export default App;