import * as React from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
  const [timeElapsed, setTimeElapsed] = React.useState(0);

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
      <Button type="button" onClick={pauseTimer}>
        Reset timer
      </Button>
      <Button
        type="button"
        disabled={allWords.length === 0}
        onClick={() => {
          const rndnum = Math.floor(Math.random() * allWords.length);
          const word = allWords[rndnum];
          setWords((prevWords) => [word, ...prevWords]);
          allWords = allWords.filter((_, index) => index !== rndnum);
        }}
      >
        SUBMIT
      </Button>{" "}
      <br />
      <ul>
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <input ref={inputRef} />
    </div>
  );
}

export default App;
