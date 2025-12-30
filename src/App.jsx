import React, { useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // home, game, result
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState(null);

  const startGame = (id) => {
    setUserId(id);
    setView('game');
  };

  const finishGame = (resultData) => {
    setResult(resultData);
    setView('result');
  };

  const resetGame = () => {
    setResult(null);
    setView('home');
    // or setView('game') to replay immediately with same ID? 
    // Usually 'home' to allow new ID or re-login is safer, or just restart.
    // Requirement says: "若同 ID 已通關過...". So re-playing with same ID is fine.
    // Let's go to home to keep it simple.
  };

  return (
    <>
      {view === 'home' && <Home onStart={startGame} />}
      {view === 'game' && <Game userId={userId} onFinish={finishGame} />}
      {view === 'result' && <Result userId={userId} result={result} onRetry={resetGame} />}
    </>
  );
}

export default App;
