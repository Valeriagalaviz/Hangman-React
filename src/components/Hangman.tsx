import { useEffect,useState } from 'react';
import hangman0 from '../img/hangman0.png';
import hangman1 from '../img/hangman1.png';
import hangman2 from '../img/hangman2.png';
import hangman3 from '../img/hangman3.png';
import hangman4 from '../img/hangman4.png';
import hangman5 from '../img/hangman5.png';
import hangman6 from '../img/hangman6.png';

interface HangmanProps {
  words: string[]; 
}

const errorImages = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

const Hangman = ({words}: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startClock, setStartClock] = useState(false);
  const [win, setWinScore] = useState(0);
  const [lost, setLostScore] = useState(0);

  const handleStartGame = () => {
      setShowInput(true);
      setStartClock(true);
  };

  const displayWord = selectedWord.split('').map((letter) => {
    console.log("selectedWord: ", selectedWord)
    if (guessedLetters.includes(letter)) {
      console.log("guessedLetters: ",guessedLetters)
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
        console.log("setErrrorCount: ", setErrorCount)
      }
    }
  };

  const restartGame = () => {
    const newWordIndex = Math.floor(Math.random() * words.length);
    const newWord = words[newWordIndex];
    setSelectedWord(newWord);
    setGuessedLetters([]); // Reiniciar las letras adivinadas
    setErrorCount(0);
  };

  const scoreGame = () => {
    if (errorCount >= 5) {
      setLostScore((lost) => lost + 1);
    }
    if (displayWord.join('') === selectedWord) {
      setWinScore((win) => win + 1);
    }
  }

  const imageError = () => {
    if (errorCount < errorImages.length) {
      return <img src={errorImages[errorCount]} alt={`Error ${errorCount + 1}`} />;
    } else {
      console.log("No hay imagen disponible")
    }
  };

  useEffect(() => {
    if(startClock){
      const timer = setInterval(() => {
        setSeconds(seconds=>seconds+1)
         
      }, 1000);
    
    return ()=>{
      clearInterval(timer);}
  }
  },[startClock]);
  



  return (
    <div className="elements">
    <div className="timer-container">
      <div className="timer">
        <p>
          Time: {seconds < 10 ? "0" + seconds : seconds} 
          <br/>
          seconds have passed!
        </p>
      </div>
    </div>
      <div className="button">
      <button className='start' onClick={handleStartGame} >START GAME</button>
      </div>
      {imageError()}
      <p>{displayWord.join(' ')}</p>
      {showInput && <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />}
      {(displayWord.join('') === selectedWord || errorCount > 5) && (
        <button onClick={() => {
          restartGame();
          scoreGame();
          setSelectedWord(words[Math.floor(Math.random() * words.length)]);
        }}>Select New Word</button>        
      )}
      <p id='errores'>Cantidad de errores: {errorCount}</p>
      {displayWord.join('') === selectedWord && (
        <p>You won in this round</p>
      )}
      <h2 id='scoreboard'>Scoreboard</h2>
      <div className='Scoreboard'>
        <table>
          <thead>
            <tr>
              <th id='win'>YOU WIN!</th>
              <th id='lose'>YOU LOSE!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{win}</td>
              <td>{lost}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hangman;
