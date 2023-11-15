import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';
import { WINNING_COMBINATIONS } from './components/Winning-combination';

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2',
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const derivedActivePlayer = (gameTurns) => {

  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const deriveGameBoard = (gameTurn) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

const deriveWinner = (gameBoard, players) => {
  let Winner;
  

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {

      Winner = players[firstSquareSymbol];
    }
  }
  return Winner;
}

function App() {
  const [gameTurn, setgameTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);


  const activePlayer = derivedActivePlayer(gameTurn);

  const gameBoard =deriveGameBoard(gameTurn);
  
  const Winner = deriveWinner(gameBoard,players)

  const hasDraw = gameTurn.length === 9 && !Winner;
  
  const handleSelectSqure = (rowIndex, colIndex) => {
    
    setgameTurn((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,
      ]
      return updatedTurns;
    });
  }

  
  const handleReset = () => {
    setgameTurn([]);
  }



  const handlePlayerName = (symbol, NewName) => {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: NewName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>

          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerName} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerName} />
        </ol>
        {(Winner || hasDraw) && <GameOver winner={Winner} onReset={handleReset} />}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />

    </main>
  );
}

export default App;
