


export default function GameBoard({selectePlayer, board}) {
    

    // const [gameBoard, setGameBoard] = useState(initalGameBoard);

    // function handlerSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map(innarArray => [...innarArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    // });
    // selectePlayer();
    // }

    return (
    <ol id = "game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => selectePlayer(rowIndex,colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))
        }
        </ol>);
        
}