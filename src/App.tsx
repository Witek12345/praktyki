import * as React from "react";
import "./App.css";
import { useCallback } from "react";

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
  "dupa",
];

const maxTries = 10;

function App() {
  const timerRef = React.useRef<ReturnType<typeof setInterval>>(0);
  const [selectedWord, setSelectedWord] = React.useState("");
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = React.useState<string[]>([]);

  const hidden_word = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"));
  const isGameOver = wrongGuesses.length >= maxTries;
  const isGameWon = !hidden_word.includes("_");

  const startTimer = React.useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
  }, []);

  const pauseTimer = React.useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const resetTimer = React.useCallback(() => {
    setTimeElapsed(0);
    clearInterval(timerRef.current);
    startTimer();
  }, [startTimer]);

  React.useEffect(() => {
    if (isGameOver || isGameWon) {
      pauseTimer();
    }
  }, [isGameOver, isGameWon, pauseTimer]);

  React.useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerRef.current);
      setTimeElapsed(0);
    };
  }, [startTimer]);

  const getNewWord = useCallback(() => {
    const rndnum = Math.floor(Math.random() * allWords.length);
    const word = allWords[rndnum];
    setSelectedWord(word);
    setGuessedLetters([]);
    setWrongGuesses([]);
    allWords = allWords.filter((_, index) => index !== rndnum);
    resetTimer();
  }, [resetTimer]);

  React.useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  return (
    <div>
      <div>Tries: {wrongGuesses.length}</div>
      <div>{timeElapsed}</div>
      <button type="button" onClick={resetTimer}>
        Reset timer
      </button>
      <button
        type="button"
        disabled={allWords.length === 0}
        onClick={getNewWord}
      >
        Randomize
      </button>{" "}
      <br />
      <div>{hidden_word}</div>
      <input
        disabled={isGameOver || isGameWon}
        onKeyDown={(event) => {
          event.preventDefault();
          const letter = event.key;
          if (guessedLetters.includes(letter)) {
            alert("You already guessed that letter");
            return;
          }

          if (selectedWord.includes(letter)) {
            setGuessedLetters((prevGuessedLetters) => [
              ...prevGuessedLetters,
              letter,
            ]);
          } else {
            // Invalid letter
            setWrongGuesses((prevGuessedLetters) => [
              ...prevGuessedLetters,
              letter,
            ]);
          }
        }}
      />
    </div>
  );
}

export default App;
