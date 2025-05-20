import * as React from "react";
import "./App.css";
//import { stat } from "fs";

let allWords = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "forest",
  "grape",
  "house",
  "ice",
  "jungle",
  "kangaroo",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "pencil",
  "queen",
  "river",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "water",
  "xylophone",
  "yogurt",
  "zebra",
  "airplane",
  "book",
  "cloud",
  "drum",
  "engine",
  "feather",
  "guitar",
  "hammer",
  "island",
  "jacket",
  "kite",
  "ladder",
  "mirror",
  "needle",
  "orange",
  "pizza",
  "quilt",
  "robot",
  "snake",
  "train",
  "unicorn",
  "vase",
  "whale",
  "yarn",
];

type Interval = typeof setInterval;
type IntervalRef = ReturnType<Interval>;


function App() {
  const timerRef = React.useRef<ReturnType<typeof setInterval>>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [hidden_words, setHidden_words] = React.useState('');
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [inputLetter, setInputLetter] = React.useState<string>('');
  const [actualword, setActualword] = React.useState<string>('');
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = React.useState(0);
  const [status, setStatus] = React.useState<string>('playing');
  
  const maxTries = 10;
  const rndnum = Math.floor(Math.random() * allWords.length);
  const word = allWords[rndnum];
  const hidden_word = ('_'.repeat(word.length).trim());
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      setTimeElapsed(0);
      clearInterval(timerRef.current);
    };
  }, [words]);

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    inputRef.current?.focus();
  };

  return (
    <div>
      <div>{timeElapsed}</div>
      <button type="button" onClick={pauseTimer}>
        Reset timer
      </button>
      <button
        type="button"
        disabled={allWords.length === 0}
        onClick={() => {
          const rndnum = Math.floor(Math.random() * allWords.length);
          const word = allWords[rndnum];
          setWords((prevWords) => [word, ...prevWords]);
          allWords = allWords.filter((_, index) => index !== rndnum);
          const hidden_word = ('_'.repeat(word.length).trim());
        }  
      }
      >
        Randomize
      </button>{" "}
      <br />
      <ul>
          <li key={word}>{hidden_word}</li>
      </ul>
      <input ref={inputRef} />
      <button
        type="button"
        onClick={() => {
          React.useEffect(() => {
            const letter = inputLetter;
            if(guessedLetters.includes(letter) || status !== 'playing'){
              setInputLetter(letter);        
            }
            else if(letter && status === 'playing'){
              const guessed = [...guessedLetters, letter];
              setGuessedLetters(guessed);
            
            if(!word.includes(letter)){
              const wrong = wrongGuesses + 1;
              setWrongGuesses(wrong);
            }

            if(wrong >= maxTries){
              setStatus('lost');
            }
            }
            else{
              const allGuessed = word.split('').every((char) => guessed.includes(char));
              if (allGuessed) {
                setStatus('won');
              }
            }
            setInputLetter('');
            },[inputLetter]);
        }} 
      >
        Check
      </button>
    </div>
  );
}

export default App;
