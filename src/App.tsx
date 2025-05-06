import { useState } from 'react'
import * as React from 'react';
import './App.css'

const words = [ "apple", "banana", "car", "dog", "elephant", "forest", "grape", "house", "ice", "jungle",
  "kangaroo", "lemon", "mountain", "notebook", "ocean", "pencil", "queen", "river", "sun", "tree",
  "umbrella", "violin", "water", "xylophone", "yogurt", "zebra", "airplane", "book", "cloud", "drum",
  "engine", "feather", "guitar", "hammer", "island", "jacket", "kite", "ladder", "mirror", "needle",
  "orange", "pizza", "quilt", "robot", "snake", "train", "unicorn", "vase", "whale", "yarn"]

function App() {
  const [rndnum, setRndnum] = React.useState(0);
    return( 
    <div>
      <button onClick={() => {    
        let rndnum = Math.floor(Math.random() * 50);   
        console.log(rndnum);
        setRndnum(rndnum);  
      }}>
        SUBMIT
      </button> <br />
      {words[rndnum]}     
    </div>
    )     
}

export default App
