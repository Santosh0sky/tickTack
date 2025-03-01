import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";  
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function driveGameBoard(gameTurns){
  let gameBoard = [...INITAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns){
      const  {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){

  let winner;

    for(const combination of WINNING_COMBINATIONS){
      const fistSquareSymbole = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbole = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbole = gameBoard[combination[2].row][combination[2].column];

      if(fistSquareSymbole && fistSquareSymbole === secondSquareSymbole && fistSquareSymbole === thirdSquareSymbole){
        winner = players[fistSquareSymbole];
      }
    }

  return winner;    

}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns]=useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = driveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const draw = gameTurns.length === 9 && !winner;

  function handlerSelectSquare(rowIndex, colIndex){ 

    setGameTurns((prevTurns) => {

    const currentPlayer = deriveActivePlayer(prevTurns);  

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }


  return (<div>
    <h1>React Tic-Tac-Toe</h1>
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initalName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
          <Player initalName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard selectePlayer={handlerSelectSquare} board={gameBoard}/>
      </div>
    </main>
    <Log className='highlighted' turns={gameTurns}/>
    </div>
  )
}

export default App
