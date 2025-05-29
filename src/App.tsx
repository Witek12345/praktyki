import { useState } from 'react'
import './App.css'

type BoardItem = {
  x: number;
  y: number;
  value: 'white-pawn' | 'black-pawn' | 'white-queen' | 'black-queen' | 'empty';
}

const generateBoard = (size: number): BoardItem[] => {
  const items: BoardItem[] = [];
  for (let y = 1; y < size + 1; y++) {
    for (let x = 1; x < size + 1; x++) {
      items.push({
        x,
        y,
        value: 'empty'
      });
    }
  }
  return items;
}

const getColor = (x: number, y: number): 'box-white' | 'box-black' => {
    if ((x + y) % 2 === 0) {
        return 'box-white';
    }
    return 'box-black';
}

function App() {
  const [board] = useState<BoardItem[]>(generateBoard(8));

  return(
      <div className="gridContainer">
        {board.map((item) => (
            <div key={`${item.x}-${item.y}`} style={{ gridColumn: item.x, gridRow: item.y }} className={`box ${getColor(item.x, item.y)}`} />)
        )}
      </div>
  )
}

export default App
