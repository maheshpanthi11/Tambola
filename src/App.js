import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = JSON.parse(sessionStorage.getItem('charsInBucket')) ?? [];
  const [char, setChar] = useState(data[data.length - 1]);
  const [charsInBucket, setCharsInBucket] = useState(data);

  useEffect(() => {
    sessionStorage.setItem('charsInBucket', JSON.stringify(charsInBucket));
  }, [charsInBucket]);

  const getMeNewChar = () => {
    let result = '';
    const charactersLength = characters.length;   
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    while (charsInBucket.indexOf(result) !== -1) {
      console.log(Math.random());
      result = characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCharsInBucket([...charsInBucket, result]);
    setChar(result);
  };

  const reset = () => {
    setChar('');
    setCharsInBucket([]);
    sessionStorage.setItem('charsInBucket', null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ color: 'pink' }}>Tambola Game</h2>
        <div style={{ display: 'flex', color: 'pink', justifyContent: 'center' }}>
          <button onClick={getMeNewChar} disabled={charsInBucket.length == 26} style={{ backgroundColor: 'pink' }} >Hit me!</button>
          <button onClick={reset} style={{ marginLeft: 10, backgroundColor: 'pink' }} >Reset</button></div>
        <h2 style={{ color: 'green' }}>{char ? char : '--'}</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {characters.split('')?.map((item, i) => (
            <h2 key={i} className={charsInBucket.indexOf(item) !== -1 ? 'selected' : ''} style={{ color: 'red', fontWeight: 500, border: '1px solid black', padding: '10px' }}>{item}</h2>
          ))}
        </div>
        <p style={{ color: 'pink' }}>
          Rules :
        </p>        
        <small>This game is similar to the tambola with charaters of your name.</small>
        <small>Everyone will write their full name on any paper.</small>
        <small>Select one person as an empire to verify whether winning claim is valid.</small>
        <small>Everytime <b>"Hit me!"</b> is pressed by empire, any random character will be selected.</small>
        <small>The first person whose name's all character reveals first, will be our winner.</small>
        <small>Verification will be based on FIFO order, in case multiple hand raise at once.</small>
        <small>Best of luck!</small>
      </header >
    </div >
  );
}

export default App;
