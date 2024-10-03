import { useState } from "react";
import Square from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from "./constants";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { checkEndGame, checkWinner } from "./logic/logic";
import { getItemStorage,removeItemStorage,saveItemStorage } from "./logic/storage/storage";

function App() {
  const [board, setBoard] = useState(()=>{
    const boardStorage = getItemStorage('board')
    return boardStorage ? boardStorage : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnStorage = JSON.parse(window.localStorage.getItem('turn'))

    return turnStorage ? turnStorage : TURNS.X
  });
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {

    if(board[index] || winner ) return

    const newBoard = [...board]
    newBoard[index] = turn;
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    saveItemStorage('board', newBoard)
    saveItemStorage('turn', newTurn)

    const newWinner = checkWinner(newBoard);

    if(newWinner){
      setWinner(()=>{
        removeItemStorage('board')
        removeItemStorage('turn')
        return newWinner;
      })
      confetti()
    }else if(checkEndGame(newBoard)){
      setWinner(() => {
        removeItemStorage('board')
        removeItemStorage('turn')
        return false
      })
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard}/>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
}

export default App;
