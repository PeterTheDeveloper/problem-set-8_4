import React from 'react';
import './App.css';
import Board from './components/Game'
import BoardContextProvider from './context/BoardContextProvider';


function App() {
  return (
    <div className="App">
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </div>
  );
}

export default App;
