import { useState } from "react";
import "./App.css";
import Box from "./components/Box";
import PlayerName from "./components/PlayerName";

function App() {
  const [fill, setFill] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameEnd, setGameEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [player1win, setPlayer1win] = useState(0);
  const [player2win, setPlayer2win] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  function handleRestart() {
    setFill(Array(9).fill(null));
    setGameEnd(false);
    setCurrentTurn(currentTurn === "X" ? "0" : "X");
    currentTurn !== "X"
    ? setMessage(player1 + " Turn")
    : setMessage(player2 + " Turn");
  }
  function isDraw(stateCopy) {
    for (let i = 0; i < stateCopy.length; i++) {
      if (stateCopy[i] === null) {
        return false;
      }
    }
    return true;
  }
  function isWin(stateCopy) {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winCondition.length; i++) {
      const [a, b, c] = winCondition[i];
      if (
        stateCopy[a] !== null &&
        stateCopy[a] === stateCopy[b] &&
        stateCopy[b] === stateCopy[c]
      ) {
        return true;
      }
    }
    return false;
  }
  function handleClick(index) {
    if (gameEnd) {
      return;
    }
    if (fill[index] !== null) return;
    const stateCopy = Array.from(fill);
    stateCopy[index] = currentTurn;
    const win = isWin(stateCopy);
    if (win) {
      currentTurn === "X"
        ? setPlayer1win(player1win + 1)
        : setPlayer2win(player2win + 1);
      currentTurn === "X"
        ? setMessage(player1 + " won the game")
        : setMessage(player2 + " won the game");
      setGameEnd(true);
      setFill(stateCopy);
      return;
    }
    if (isDraw(stateCopy)) {
      setGameEnd(true);
      setMessage("Game Draw");
      setFill(stateCopy);
      return;
    }
    setCurrentTurn(currentTurn === "X" ? "0" : "X");
    setMessage(currentTurn !== "X" ? player1 + " Turn" : player2 + " Turn");
    setFill(stateCopy);
  }
  const values = {
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    player1win,
    setPlayer1win,
    player2win,
    setPlayer2win,
    gameStart,
    setGameStart,
    setMessage,
  };
  return (
    <div className="h-screen w-screen flex justify-center bg-black text-white items-center relative overflow-hidden">
      <div className="w-full uppercase text-2xl font-bold text-center fixed  top-2 text-white left-1/2 -translate-x-1/2 underline">
        Tic-tac-toe game
      </div>
      <div className={`${gameStart ? "absolute top-14 left-0 w-full" : ""}`}>
        <PlayerName values={values} />
      </div>
      {gameStart && (
        <div className="flex flex-col justify-center items-center gap-y-2 relative">
          <div
            className={`text-xl font-bold flex justify-center items-center text-center transition-all duration-200 uppercase m-0`}
          >
            {message}
          </div>
          <div className="w-[190px] h-[170px] relative flex overflow-hidden flex-col justify-center items-center">
            <div className="flex gap-2">
              <Box symbol={fill[0]} onClick={() => handleClick(0)}></Box>
              <Box symbol={fill[1]} onClick={() => handleClick(1)}></Box>
              <Box symbol={fill[2]} onClick={() => handleClick(2)}></Box>
            </div>
            <div className="flex gap-2">
              <Box symbol={fill[3]} onClick={() => handleClick(3)}></Box>
              <Box symbol={fill[4]} onClick={() => handleClick(4)}></Box>
              <Box symbol={fill[5]} onClick={() => handleClick(5)}></Box>
            </div>
            <div className="flex gap-2">
              <Box symbol={fill[6]} onClick={() => handleClick(6)}></Box>
              <Box symbol={fill[7]} onClick={() => handleClick(7)}></Box>
              <Box symbol={fill[8]} onClick={() => handleClick(8)}></Box>
            </div>
            <span className="absolute border-b-4 w-full border-white top-[34%]"></span>
            <span className="absolute border-b-4 w-full border-white top-[65%]"></span>
            <span className="absolute border-l-4 h-[170px] border-white  left-[67%]"></span>
            <span className="absolute border-l-4 h-[170px] border-white  left-[33%]"></span>
          </div>
          {gameEnd && (
            <button
              onClick={handleRestart}
              className="border border-black px-2 py-1 transition-all duration-200 bg-slate-300 text-black hover:bg-white rounded-md font-bold"
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
